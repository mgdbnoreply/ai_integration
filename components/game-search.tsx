

"use client"

import { useState, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight, X, Info, Filter } from "lucide-react"
import { YearRangeSlider } from "@/components/year-range-slider"
import { GameModal } from "@/components/game-modal"
import type { GameData } from "@/lib/types"
import { GameAPI } from '@/services/api';

export function GameSearch() {
  const [games, setGames] = useState<GameData[]>([])
  const [filteredGames, setFilteredGames] = useState<GameData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Modal state
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const gamesPerPage = 9

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("all")

  // Year range filter
  const [minYear, setMinYear] = useState(1970)
  const [maxYear, setMaxYear] = useState(2023)
  const [yearRange, setYearRange] = useState<[number, number]>([minYear, maxYear])

  // Checkbox filter states
  const [hardwareFilters, setHardwareFilters] = useState<string[]>([])
  const [connectivityFilters, setConnectivityFilters] = useState<string[]>([])

  // Filter visibility state
  const [showFilters, setShowFilters] = useState(false)

  // Filter options (will be populated from data)
  const [genreOptions, setGenreOptions] = useState<string[]>([])
  const [hardwareOptions, setHardwareOptions] = useState<string[]>([])
  const [connectivityOptions, setConnectivityOptions] = useState<string[]>([])

  // Debounce search term to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300) // 300ms delay

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Fetch games data from the API with better error handling
  // useEffect(() => {
  //   async function fetchGames() {
  //     try {
  //       setLoading(true)
  //       setError(null)
        
  //       console.log('Fetching games...')
  //       const response = await GameAPI.getAllGames()
        
  //       // The API service should now always return an array
  //       // But let's add extra safety checks
  //       let data: GameData[] = []
        
  //       if (Array.isArray(response)) {
  //         // Clean and transform the DynamoDB data to match expected format
  //         data = response.map((game: any, index: number) => {
  //           // Log the first game to see its structure
  //           if (index === 0) {
  //             console.log('First game structure:', game)
  //           }
            
  //           // Map DynamoDB format to expected GameData format
  //           const cleanGame: GameData = {
  //             // Map the field names from DynamoDB to expected names
  //             GameId: game.GameID?.S || game.GameID || '',
  //             Title: game.GameTitle?.S || game.GameTitle || '',
  //             Description: game.GameDescription?.S || game.GameDescription || '',
  //             Developers: game.Developer?.S || game.Developer || '',
  //             Country: game.DeveloperLocation?.S || game.DeveloperLocation || '',
  //             Year: game.YearDeveloped?.S || game.YearDeveloped || '',
  //             Genre: game.Genre?.S || game.Genre || '',
  //             Hardware: game.HardwareFeatures?.S || game.HardwareFeatures || '',
  //             Connectivity: game.Connectivity?.S || game.Connectivity || '',
  //             Players: game.Players?.S || game.Players || '',
  //             Purpose: game.Purpose?.S || game.Purpose || '',
  //             MonetizationModel: game.MonetizationModel?.S || game.MonetizationModel || '',
  //             OpenSource: game.OpenSource?.S || game.OpenSource || '',
  //             GameWebsite: game.GameWebsite?.S || game.GameWebsite || '',
  //             DeviceType: game.DeviceType?.S || game.DeviceType || '',
  //             MobilityType: game.MobilityType?.S || game.MobilityType || '',
  //             ControlMechanisms: game.ControlMechanisms?.S || game.ControlMechanisms || '',
  //             SiteSpecific: game.SiteSpecific?.S || game.SiteSpecific || '',
  //             // Handle array fields (DynamoDB SS format - String Set)
  //             Pictures: game.Photos?.SS ? game.Photos.SS.join(',') : 
  //                      game.Photos?.S || game.Photos || '',
  //             Videos: game.Videos?.SS ? game.Videos.SS.join(',') : 
  //                    game.Videos?.S || game.Videos || '',
  //             Articles: game.Articles?.SS ? game.Articles.SS.join(',') : 
  //                      game.Articles?.S || game.Articles || ''
  //           }
            
  //           return cleanGame
  //         })
          
  //         console.log(`Successfully loaded and cleaned ${data.length} games`)
  //         console.log('Sample cleaned game:', data[0])
  //       } else {
  //         console.error('Unexpected response format:', response)
  //         throw new Error('Invalid data format received from API')
  //       }
        
  //       // Only set state if we have valid data
  //       if (data.length > 0) {
  //         setGames(data)
  //         setFilteredGames(data)
  //         extractFilterOptions(data)
  //       } else {
  //         setError("No games found in the database")
  //       }
        
  //       setLoading(false)
  //     } catch (error) {
  //       console.error("Error fetching games:", error)
  //       setError(
  //         error instanceof Error 
  //           ? `Failed to load games: ${error.message}` 
  //           : "Failed to load games. Please try refreshing the page."
  //       )
  //       setLoading(false)
  //     }
  //   }

  //   fetchGames()
  // }, [])

  // In RMGDOfficial-Frontend/components/game-search.tsx

useEffect(() => {
  async function fetchGames() {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching games...');
      const response = await GameAPI.getAllGames();
      
      let data: GameData[] = [];
      
      if (Array.isArray(response)) {
        // Correctly map API keys to the GameData type keys
        data = response.map((game: any, index: number) => {
          // Helper to safely get string value from DynamoDB format
          const getString = (obj: any): string => {
            if (!obj) return '';
            if (typeof obj === 'string') return obj;
            if (obj.S) return obj.S;
            if (obj.SS) return obj.SS.join(', ');
            return '';
          };

          const mappedGame: GameData = {
            Title: getString(game.GameTitle),
            Year: getString(game.YearDeveloped),
            Developers: getString(game.Developer),
            City: getString(game.City) || '',
            Country: getString(game.DeveloperLocation),
            URL: getString(game.GameWebsite),
            Description: getString(game.GameDescription),
            Pictures: getString(game.Photos),
            Documentation: getString(game.Videos), // Assuming Videos map to Documentation
            Articles: getString(game.Articles),
            Purpose: getString(game.Purpose),
            "Open Source": getString(game.OpenSource),
            "# Players": getString(game.Players),
            Location: getString(game.SiteSpecific),
            Genre: getString(game.Genre),
            Hardware: getString(game.HardwareFeatures),
            Connectivity: getString(game.Connectivity),
            Contact: getString(game.Contact) || 'N/A',
            // Add any other fields from GameData type here
          };
          return mappedGame;
        });
        
        console.log(`Successfully loaded and mapped ${data.length} games`);
        if (data.length > 0) {
            console.log('Sample mapped game:', data[0]);
        }
      } else {
        console.error('Unexpected response format:', response);
        throw new Error('Invalid data format received from API');
      }
      
      if (data.length > 0) {
        setGames(data);
        setFilteredGames(data);
        extractFilterOptions(data);
      } else {
        setError("No games found in the database");
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      setError(
        error instanceof Error 
          ? `Failed to load games: ${error.message}` 
          : "Failed to load games. Please try refreshing the page."
      );
      setLoading(false);
    }
  }

  fetchGames();
}, []);

  // Extract unique values for filter options
  const extractFilterOptions = (data: GameData[]) => {
    try {
      // Determine min and max years from the data
      const years = data
        .map((game) => Number.parseInt(game.Year))
        .filter((year) => !isNaN(year))
      
      if (years.length > 0) {
        const min = Math.min(...years)
        const max = Math.max(...years)
        setMinYear(min)
        setMaxYear(max)
        setYearRange([min, max])
      }

      // Extract all unique genres
      const genres = [...new Set(data.map((game) => game.Genre))]
        .filter(Boolean)
        .sort()
      setGenreOptions(["all", ...genres])

      // Extract unique hardware types, safely checking if the value is a string
      const hardware = [
        ...new Set(
          data.flatMap((game) => 
            typeof game.Hardware === 'string' 
              ? game.Hardware.split(",").map((h) => h.trim()) 
              : []
          )
        ),
      ]
        .filter(Boolean)
        .sort()
      setHardwareOptions(hardware)

      // Extract unique connectivity types, safely checking if the value is a string
      const connectivity = [
        ...new Set(
          data.flatMap((game) => 
            typeof game.Connectivity === 'string' 
              ? game.Connectivity.split(",").map((c) => c.trim()) 
              : []
          )
        ),
      ]
        .filter(Boolean)
        .sort()
      setConnectivityOptions(connectivity)
    } catch (error) {
      console.error("Error extracting filter options:", error)
    }
  }

  // Apply all filters whenever a filter state changes
  useEffect(() => {
    let filtered = games

    // Apply search term filter (using debounced search term)
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase()
      filtered = filtered.filter(
        (game) =>
          game.Title?.toLowerCase().includes(searchLower) ||
          game.Description?.toLowerCase().includes(searchLower) ||
          game.Developers?.toLowerCase().includes(searchLower),
      )
    }

    // Apply year range filter
    filtered = filtered.filter((game) => {
      const year = Number.parseInt(game.Year)
      return !isNaN(year) && year >= yearRange[0] && year <= yearRange[1]
    })

    // Apply genre filter
    if (genreFilter !== "all") {
      filtered = filtered.filter((game) => game.Genre?.includes(genreFilter))
    }

    // Apply checkbox filters for hardware
    if (hardwareFilters.length > 0) {
      filtered = filtered.filter((game) => {
        if (!game.Hardware) return false
        const gameHardware = game.Hardware.split(",").map((h) => h.trim())
        return hardwareFilters.some((filter) => gameHardware.includes(filter))
      })
    }

    // Apply checkbox filters for connectivity
    if (connectivityFilters.length > 0) {
      filtered = filtered.filter((game) => {
        if (!game.Connectivity) return false
        const gameConnectivity = game.Connectivity.split(",").map((c) => c.trim())
        return connectivityFilters.some((filter) => gameConnectivity.includes(filter))
      })
    }

    setFilteredGames(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [games, debouncedSearchTerm, yearRange, genreFilter, hardwareFilters, connectivityFilters])

  // Toggle hardware filter
  const toggleHardwareFilter = (hardware: string) => {
    setHardwareFilters((prev) => 
      prev.includes(hardware) 
        ? prev.filter((h) => h !== hardware) 
        : [...prev, hardware]
    )
  }

  // Toggle connectivity filter
  const toggleConnectivityFilter = (connectivity: string) => {
    setConnectivityFilters((prev) =>
      prev.includes(connectivity) 
        ? prev.filter((c) => c !== connectivity) 
        : [...prev, connectivity]
    )
  }

  // Handle year range change
  const handleYearRangeChange = (range: [number, number]) => {
    setYearRange(range)
  }

  // Get the first image from a comma-separated string
  const getFirstImage = (pictures: string) => {
    if (!pictures) return "/placeholder.svg?height=300&width=400"
    const imageUrls = pictures.split(",").map((url) => url.trim())
    return imageUrls[0] || "/placeholder.svg?height=300&width=400"
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setYearRange([minYear, maxYear])
    setGenreFilter("all")
    setHardwareFilters([])
    setConnectivityFilters([])
  }

  // Open game modal
  const openGameModal = (game: GameData) => {
    setSelectedGame(game)
    setIsModalOpen(true)
  }

  // Close game modal
  const closeGameModal = () => {
    setIsModalOpen(false)
  }

  // Pagination logic
  const indexOfLastGame = currentPage * gamesPerPage
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame)
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Count active filters
  const activeFilterCount =
    (searchTerm ? 1 : 0) +
    (genreFilter !== "all" ? 1 : 0) +
    hardwareFilters.length +
    connectivityFilters.length +
    (yearRange[0] !== minYear || yearRange[1] !== maxYear ? 1 : 0)

  return (
    <div className="py-12 px-4 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Red background section with inner shadow */}
        <div className="bg-red-600 rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="bg-[rgba(0,0,0,0.1)] shadow-inner p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-bold text-white">Browse Games</h2>
                <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
              </div>
              <p className="text-white/80 mt-2">Explore our curated collection of retro mobile games</p>
            </div>

            {loading ? (
              <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-xl shadow-inner">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
                <p className="mt-4 text-white">Loading game data...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-xl shadow-inner">
                <p className="text-white mb-4">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-white hover:bg-white/90 text-red-600"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                {/* Search bar in a card */}
                <Card className="mb-6 overflow-hidden">
                  <CardContent className="p-4 bg-white">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search by title, description or developer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-28 py-6 border-gray-200 text-black text-lg rounded-lg shadow-inner"
                      />
                      <Button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`absolute right-2 top-2 flex items-center gap-2 transition-all duration-300 ${
                          showFilters 
                            ? "bg-red-600 hover:bg-red-700 text-white" 
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                        size="sm"
                      >
                        <Filter className={`h-4 w-4 transition-transform duration-300 ${showFilters ? "rotate-180" : "rotate-0"}`} />
                        <span className="text-sm font-medium">Filter</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Filters - Toggleable */}
                <div
                  className={`mb-8 grid grid-cols-1 lg:grid-cols-4 gap-4 transition-all duration-500 ease-in-out origin-top ${
                    showFilters
                      ? "opacity-100 scale-y-100 max-h-[2000px]"
                      : "opacity-0 scale-y-0 max-h-0 overflow-hidden pointer-events-none"
                  }`}
                >
                  {/* Year Range Filter */}
                  <Card className="lg:col-span-2 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4 md:p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="w-2 h-6 bg-red-600 mr-2 rounded-sm"></span>
                        Year Range
                      </h3>
                      <YearRangeSlider 
                        minYear={minYear} 
                        maxYear={maxYear} 
                        onChange={handleYearRangeChange} 
                      />
                    </CardContent>
                  </Card>

                  {/* Genre Filter */}
                  <Card className="lg:col-span-2 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4 md:p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="w-2 h-6 bg-red-600 mr-2 rounded-sm"></span>
                        Genre
                      </h3>
                      <Select value={genreFilter} onValueChange={setGenreFilter}>
                        <SelectTrigger className="bg-white border-gray-300 text-black">
                          <SelectValue placeholder="Select Genre" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-300 text-black">
                          {genreOptions.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre === "all" ? "All Genres" : genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Hardware Filter */}
                  <Card className="lg:col-span-2 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4 md:p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="w-2 h-6 bg-red-600 mr-2 rounded-sm"></span>
                        Hardware
                      </h3>
                      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2">
                        {hardwareOptions.map((hardware) => (
                          <div key={hardware} className="flex items-center">
                            <Checkbox
                              id={`hardware-${hardware}`}
                              checked={hardwareFilters.includes(hardware)}
                              onCheckedChange={() => toggleHardwareFilter(hardware)}
                              className="mr-2 data-[state=checked]:bg-red-600 border-gray-400"
                            />
                            <label 
                              htmlFor={`hardware-${hardware}`} 
                              className="text-sm text-black cursor-pointer"
                            >
                              {hardware}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Connectivity Filter */}
                  <Card className="lg:col-span-2 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4 md:p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="w-2 h-6 bg-red-600 mr-2 rounded-sm"></span>
                        Connectivity
                      </h3>
                      <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2">
                        {connectivityOptions.map((connectivity) => (
                          <div key={connectivity} className="flex items-center">
                            <Checkbox
                              id={`connectivity-${connectivity}`}
                              checked={connectivityFilters.includes(connectivity)}
                              onCheckedChange={() => toggleConnectivityFilter(connectivity)}
                              className="mr-2 data-[state=checked]:bg-red-600 border-gray-400"
                            />
                            <label
                              htmlFor={`connectivity-${connectivity}`}
                              className="text-sm text-black cursor-pointer"
                            >
                              {connectivity}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reset Filters Button */}
                  <div className="lg:col-span-4 flex justify-end">
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="mt-2 border-white/30 bg-white/10 hover:bg-white/20 text-white shadow-sm backdrop-blur-sm"
                    >
                      <X className="h-4 w-4 mr-2" /> Reset All Filters
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Results Info - Outside the red background */}
        {!loading && !error && games.length > 0 && (
          <>
            <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Info className="h-4 w-4 text-red-600" />
                <span>
                  Showing <strong>{currentGames.length}</strong> of <strong>{filteredGames.length}</strong> games
                </span>
                {activeFilterCount > 0 && (
                  <span className="text-red-600">({activeFilterCount} active filters)</span>
                )}
              </div>

              {activeFilterCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="border-gray-300 text-red-600 hover:bg-red-600/10"
                >
                  <X className="h-4 w-4 mr-1" /> Clear Filters
                </Button>
              )}
            </div>

            {/* Game Grid */}
            {filteredGames.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentGames.map((game, index) => (
                    <Card
                      key={game.GameId || index}
                      className="group bg-white overflow-hidden transition-all duration-300 cursor-pointer hover:translate-y-[-3px] relative"
                      onClick={() => openGameModal(game)}
                    >
                      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>

                      <div className="h-48 bg-zinc-100 relative overflow-hidden">
                        <img
                          src={getFirstImage(game.Pictures) || "/placeholder.svg?height=300&width=400"}
                          alt={game.Title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=300&width=400"
                          }}
                        />
                        {game.Year && (
                          <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 text-xs rounded-full backdrop-blur-sm">
                            {game.Year}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-5">
                        <h3 className="text-xl font-bold mb-2 text-black group-hover:text-red-600 transition-colors">
                          {game.Title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {game.Developers && <span>By {game.Developers}</span>}
                          {game.Country && <span> • {game.Country}</span>}
                        </p>
                        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                          {game.Description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {game.Genre && (
                            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                              {game.Genre}
                            </span>
                          )}
                          {game.Hardware && (
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-200">
                              {game.Hardware.split(",")[0].trim()}
                            </span>
                          )}
                        </div>

                        <div className="inline-flex items-center group-hover:text-red-600 transition-colors text-sm pt-2 font-medium border-t border-gray-100 w-full">
                          View Details
                          <svg
                            className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {filteredGames.length > gamesPerPage && (
                  <div className="flex justify-center mt-10">
                    <div className="bg-white rounded-full shadow-md px-2 py-1 inline-flex items-center border border-gray-200">
                      <Button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="rounded-full bg-transparent hover:bg-gray-100 text-black disabled:text-gray-300"
                        variant="ghost"
                        size="sm"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>

                      <div className="flex items-center space-x-1 px-2">
                        {totalPages <= 7 ? (
                          // Show all page numbers if there are 7 or fewer
                          Array.from({ length: totalPages }, (_, i) => (
                            <Button
                              key={i + 1}
                              onClick={() => paginate(i + 1)}
                              className={`w-8 h-8 rounded-full p-0 ${
                                currentPage === i + 1
                                  ? "bg-red-600 text-white hover:bg-red-700"
                                  : "bg-transparent text-black hover:bg-gray-100"
                              }`}
                              variant={currentPage === i + 1 ? "default" : "ghost"}
                              size="sm"
                            >
                              {i + 1}
                            </Button>
                          ))
                        ) : (
                          // Show limited page numbers with ellipsis for many pages
                          <>
                            {/* First page */}
                            <Button
                              onClick={() => paginate(1)}
                              className={`w-8 h-8 rounded-full p-0 ${
                                currentPage === 1
                                  ? "bg-red-600 text-white hover:bg-red-700"
                                  : "bg-transparent text-black hover:bg-gray-100"
                              }`}
                              variant={currentPage === 1 ? "default" : "ghost"}
                              size="sm"
                            >
                              1
                            </Button>

                            {/* Ellipsis or page numbers */}
                            {currentPage > 3 && <span className="text-gray-400">...</span>}

                            {/* Pages around current page */}
                            {Array.from({ length: 3 }, (_, i) => {
                              const pageNum = currentPage > 3 ? currentPage - 1 + i : 2 + i

                              if (pageNum > 1 && pageNum < totalPages) {
                                return (
                                  <Button
                                    key={pageNum}
                                    onClick={() => paginate(pageNum)}
                                    className={`w-8 h-8 rounded-full p-0 ${
                                      currentPage === pageNum
                                        ? "bg-red-600 text-white hover:bg-red-700"
                                        : "bg-transparent text-black hover:bg-gray-100"
                                    }`}
                                    variant={currentPage === pageNum ? "default" : "ghost"}
                                    size="sm"
                                  >
                                    {pageNum}
                                  </Button>
                                )
                              }
                              return null
                            }).filter(Boolean)}

                            {/* Ellipsis or page numbers */}
                            {currentPage < totalPages - 2 && <span className="text-gray-400">...</span>}

                            {/* Last page */}
                            <Button
                              onClick={() => paginate(totalPages)}
                              className={`w-8 h-8 rounded-full p-0 ${
                                currentPage === totalPages
                                  ? "bg-red-600 text-white hover:bg-red-700"
                                  : "bg-transparent text-black hover:bg-gray-100"
                              }`}
                              variant={currentPage === totalPages ? "default" : "ghost"}
                              size="sm"
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                      </div>

                      <Button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="rounded-full bg-transparent hover:bg-gray-100 text-black disabled:text-gray-300"
                        variant="ghost"
                        size="sm"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Games Found</h3>
                <p className="text-gray-600 mb-6">
                  No games match your filters. Try adjusting your search criteria.
                </p>
                <Button 
                  onClick={resetFilters} 
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Game Modal */}
      <GameModal 
        game={selectedGame} 
        isOpen={isModalOpen} 
        onClose={closeGameModal} 
      />
    </div>
  )
}

