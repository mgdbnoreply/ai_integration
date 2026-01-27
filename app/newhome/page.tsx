"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GameModal } from "@/components/game-modal"
import { Search, ChevronLeft, ChevronRight, ArrowRight, Gamepad2, Database, Users, BookOpen, ExternalLink, Sparkles, Clock, Trophy, Star } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GameAPI } from '@/services/api'
import type { GameData } from "@/lib/types"

export default function NewPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [games, setGames] = useState<GameData[]>([])
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Fetch games for carousel
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await GameAPI.getAllGames()
        
        if (Array.isArray(response)) {
          const getString = (obj: any): string => {
            if (!obj) return '';
            if (typeof obj === 'string') return obj;
            if (obj.S) return obj.S;
            if (obj.SS) return obj.SS.join(', ');
            return '';
          };

          const mappedGames: GameData[] = response.slice(0, 12).map((game: any) => ({
            Title: getString(game.GameTitle),
            Year: getString(game.YearDeveloped),
            Developers: getString(game.Developer),
            City: getString(game.City) || '',
            Country: getString(game.DeveloperLocation),
            URL: getString(game.GameWebsite),
            Description: getString(game.GameDescription),
            Pictures: getString(game.Photos),
            Documentation: getString(game.Videos),
            Articles: getString(game.Articles),
            Purpose: getString(game.Purpose),
            "Open Source": getString(game.OpenSource),
            "# Players": getString(game.Players),
            Location: getString(game.SiteSpecific),
            Genre: getString(game.Genre),
            Hardware: getString(game.HardwareFeatures),
            Connectivity: getString(game.Connectivity),
            Contact: getString(game.Contact) || 'N/A',
          }));
          
          setGames(mappedGames);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  const getFirstImage = (pictures: string | undefined) => {
    if (!pictures) return "/placeholder.svg";
    const imageUrls = pictures.split(",").map((url) => url.trim());
    return imageUrls[0] || "/placeholder.svg";
  };

  const openGameModal = (game: GameData) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const scrollToSlide = (direction: 'prev' | 'next') => {
    const container = carouselRef.current;
    if (!container) return;
    
    const slideWidth = container.clientWidth / 4; // 4 cards are visible
    const gap = 24; // gap-6 = 24px
    const scrollAmount = slideWidth + gap;
    
    if (direction === 'prev') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setCurrentSlide(Math.max(0, currentSlide - 1));
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentSlide(Math.min(games.length - 4, currentSlide + 1));
    }
  };
  
  const researchArticles = [
    { 
      title: "The Evolution of Handheld Gaming", 
      description: "Exploring the technological advancements that shaped portable gaming.",
      category: "Technology",
      readTime: "5 min",
      featured: true
    },
    { 
      title: "Impact of Early Mobile Games on Modern Design", 
      description: "How retro mobile games influenced today's game design principles.",
      category: "Design",
      readTime: "8 min"
    },
    { 
      title: "Preserving Gaming History: A Digital Approach", 
      description: "Modern methods for archiving and preserving classic mobile games.",
      category: "Preservation",
      readTime: "6 min"
    },
    { 
      title: "Iconic Devices That Defined an Era", 
      description: "The hardware innovations that revolutionized mobile gaming.",
      category: "Hardware",
      readTime: "7 min",
      featured: true
    },
    { 
      title: "The Rise of Mobile Multiplayer Gaming", 
      description: "From local link cables to early wireless connectivity.",
      category: "Multiplayer",
      readTime: "10 min"
    },
    { 
      title: "From Pixels to Polygons: A Visual History", 
      description: "The artistic evolution of mobile game graphics.",
      category: "Graphics",
      readTime: "4 min"
    },
    
  ];

  return (
    <div className="min-h-screen">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom right, #000000, #040e24, #000000)'
        }}></div>
        {/* Optional: Add animated patterns or effects to the background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.02) 35px, rgba(255,255,255,.02) 70px)`,
            animation: 'slideBackground 60s linear infinite'
          }}></div>
        </div>
      </div>
      
      {/* Scrollable Content Container */}
      <div className="relative z-10">
        <Header />

        {/* Enhanced Title Section with Animation */}
        <section className="relative py-10 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
              animation: 'slide 20s linear infinite'
            }}></div>
          </div>
          
          <div className="relative w-full px-4 md:px-8 lg:px-16 flex flex-col items-center space-y-6">
            <div className="bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-md border-4 border-white/90 rounded-full py-1 px-12 md:py-2 md:px-24 lg:px-32 flex items-center justify-center shadow-2xl max-w-6xl w-full">
              <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  RETRO MOBILE
                </h1>
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left-0 top-1/2 -translate-y-1/2 z-0 animate-pulse"></div>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-10"></div>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  GAMING PROJECT
                </h1>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-md rounded-full py-3 md:py-4 flex items-center relative shadow-2xl border border-red-500/30 max-w-6xl w-full overflow-hidden px-16 md:px-24">
              {/* <div className="absolute left-10 md:left-20 flex -space-x-4 z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40"></div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30"></div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20"></div>
              </div> */}
              <div className="flex whitespace-nowrap animate-marquee ml-8 md:ml-12">
                <p className="text-lg md:text-xl lg:text-2xl text-white font-bold tracking-wide">
                  Preserving Mobile Gaming History • 1975-2008 • Preserving Mobile Gaming History • 1975-2008 • Preserving Mobile Gaming History • 1975-2008 •
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Hero Video Section with Overlay */}
        <section className="relative bg-black/50 backdrop-blur-sm w-full">
          <div className="relative w-full pb-[56.25%] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 z-10"></div>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/DyXNJzSwR0o?si=0OaG0MtM4wZCgGNH&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&loop=1&playlist=DyXNJzSwR0o&autoplay=1&mute=1"
              title="Retro Mobile Gaming History"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Enhanced Quick Links Section with Glassmorphism */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-gray-900/30"></div>
          <div className="relative max-w-[100rem] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-white mb-4">Discover & Explore</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">Dive into our curated collections and stay updated with the latest in retro mobile gaming preservation.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="#" className="group transform transition-all duration-300 hover:scale-105">
                <Card className="relative overflow-hidden bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl border border-gray-200/50 rounded-3xl h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="relative w-full h-56 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <Trophy className="w-20 h-20 text-white/90" />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-red-500" />
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Featured</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Device of the Week</h3>
                    <p className="text-gray-600 mb-4">Explore the iconic Nokia N-Gage and its revolutionary gaming features.</p>
                    <div className="flex items-center text-red-600 font-semibold group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="#" className="group transform transition-all duration-300 hover:scale-105">
                <Card className="relative overflow-hidden bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl border border-gray-200/50 rounded-3xl h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="relative w-full h-56 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-white/90" />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-red-500" />
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">NEW</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Latest Publications</h3>
                    <p className="text-gray-600 mb-4">Fresh research on the impact of Java games on mobile gaming evolution.</p>
                    <div className="flex items-center text-red-600 font-semibold group-hover:gap-3 transition-all">
                      Read Now <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="#" className="group transform transition-all duration-300 hover:scale-105">
                <Card className="relative overflow-hidden bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl border border-gray-200/50 rounded-3xl h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="relative w-full h-56 bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                    <Database className="w-20 h-20 text-white/90" />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-red-500" />
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">ACTIVE</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Ongoing Work</h3>
                    <p className="text-gray-600 mb-4">Currently digitizing Game Boy Advance classics and preserving source code.</p>
                    <div className="flex items-center text-red-600 font-semibold group-hover:gap-3 transition-all">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced About Section with Split Layout */}
        <section className="py-20 px-4">
          <div className="max-w-[100rem] mx-auto">
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-800/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-12 md:p-16 flex flex-col justify-center">
                  <div className="mb-8">
                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                      <Gamepad2 className="w-4 h-4" />
                      About RMGP
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                      Preserving Gaming's
                      <span className="block text-red-600 mt-2">Mobile Legacy</span>
                    </h2>
                  </div>
                  
                  <p className="text-lg text-gray-400 leading-relaxed mb-6">
                    The Retro Mobile Gaming Project (RMGP) is a comprehensive digital 
                    preservation initiative documenting the evolution of mobile gaming from 
                    1975 to 2008. Our searchable database provides detailed information about 
                    games that shaped the mobile gaming industry.
                  </p>
                  
                  <p className="text-lg text-gray-400 leading-relaxed mb-8">
                    We preserve the rich history of mobile gaming technology, design 
                    principles, and cultural significance for research and education.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link href="/about">
                      <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all">
                        Learn More <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/contribute">
                      <Button className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-6 rounded-2xl text-lg border-2 border-white shadow-lg hover:shadow-xl transition-all">
                        Contribute <ExternalLink className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="relative h-96 lg:h-full min-h-[400px] bg-gradient-to-br from-red-600 to-red-700">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/neu_ms37dz02w.jpg-48xAokXYj15MVJ0ZeSwK18G5TRTgez.jpeg"
                    alt="Nintendo Game & Watch Collection"
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Browse Games Section - Carousel with 4 Cards */}
        <section className="py-20 px-4">
          <div className="max-w-[100rem] mx-auto">
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-gray-800/50 p-10 md:p-14">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                <div>
                  <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <Gamepad2 className="w-4 h-4" />
                    Game Collection
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Browse Games</h2>
                  <p className="text-gray-300 text-lg">Discover classics from the golden age of mobile gaming</p>
                </div>
                
                <div className="mt-6 md:mt-0">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative">
                      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Search games..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-14 pr-6 py-6 text-base rounded-2xl border-2 border-gray-600 bg-gray-800/80 text-white shadow-lg hover:shadow-xl focus:shadow-xl hover:border-red-600/50 focus:border-red-600 transition-all placeholder:text-gray-400 w-80 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Game Carousel - 4 cards visible */}
              <div className="relative">
                {!loading && games.length > 4 && (
                  <button
                    onClick={() => scrollToSlide('prev')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gray-800/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-gray-700 hover:scale-110 transition-all disabled:opacity-50 -translate-x-6 border border-gray-700"
                    disabled={currentSlide === 0}
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                )}

                <div 
                  ref={carouselRef}
                  className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {loading ? (
                    [...Array(4)].map((_, i) => (
                      <div key={i} className="flex-none w-full sm:w-1/2 lg:w-[calc(25%-18px)]">
                        <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white">
                          <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
                          <CardContent className="p-6">
                            <div className="h-6 bg-gray-200 rounded-lg w-3/4 animate-pulse mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded-lg w-1/2 animate-pulse mb-4"></div>
                            <div className="h-8 bg-gray-200 rounded-lg w-full animate-pulse"></div>
                          </CardContent>
                        </Card>
                      </div>
                    ))
                  ) : (
                    games.map((game, index) => (
                      <div 
                        key={index} 
                        className="flex-none w-full sm:w-1/2 lg:w-[calc(25%-18px)] group transform transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => openGameModal(game)}
                      >
                        <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 h-full flex flex-col">
                          {/* Image Container with Overlay */}
                          <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                            <Image
                              src={getFirstImage(game.Pictures)}
                              alt={game.Title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Year Badge */}
                            <div className="absolute top-4 right-4">
                              <span className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                                {game.Year}
                              </span>
                            </div>
                            
                            {/* Genre Badge (if available) */}
                            {game.Genre && (
                              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                  {game.Genre.split(',')[0]}
                                </span>
                              </div>
                            )}
                            
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                <Gamepad2 className="w-8 h-8 text-red-600" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Card Content */}
                          <CardContent className="p-6 flex-grow flex flex-col">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-bold text-xl text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors flex-1">
                                {game.Title}
                              </h3>
                              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-all transform group-hover:translate-x-1 flex-shrink-0 ml-2" />
                            </div>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-1">{game.Developers}</p>
                            
                            {/* Additional Info */}
                            <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
                              {game["# Players"] && (
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {game["# Players"]}
                                </span>
                              )}
                              {game.Hardware && (
                                <span className="flex items-center gap-1">
                                  <Database className="w-3 h-3" />
                                  {game.Hardware.split(',')[0]}
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))
                  )}
                </div>

                {!loading && games.length > 4 && (
                  <button
                    onClick={() => scrollToSlide('next')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gray-800/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-gray-700 hover:scale-110 transition-all disabled:opacity-50 translate-x-6 border border-gray-700"
                    disabled={currentSlide >= games.length - 4}
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                )}
              </div>
              
              {/* View All Button */}
              <div className="text-center mt-14">
                <Link href="/games">
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-12 py-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                    View All Games <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Research Section with Masonry Grid */}
        <section className="py-20 px-4">
          <div className="max-w-[100rem] mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-600/30">
                <BookOpen className="w-4 h-4" />
                Research & Publications
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Latest Research</h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Explore our academic papers, case studies, and in-depth analyses of mobile gaming history
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-gray-800/50 p-10 md:p-14">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {researchArticles.map((article, index) => (
                  <Link 
                    href="#" 
                    className={`group transform transition-all duration-300 hover:scale-105 ${article.featured ? 'lg:col-span-2 lg:row-span-2' : ''}`} 
                    key={index}
                  >
                    <Card className={`bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border-gray-700/50 shadow-lg hover:shadow-2xl rounded-3xl h-full flex flex-col overflow-hidden ${article.featured ? 'border-2 border-red-700/50' : ''}`}>
                      <div className={`relative w-full ${article.featured ? 'h-64' : 'h-48'} bg-gradient-to-br from-gray-600 to-gray-700 overflow-hidden`}>
                        {article.featured && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">Featured</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </div>
                      <CardContent className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-3 mb-3 text-xs">
                          <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full font-semibold border border-gray-600/50">
                            {article.category}
                          </span>
                          <span className="text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className={`font-bold ${article.featured ? 'text-xl' : 'text-lg'} text-white group-hover:text-red-400 mb-2 transition-colors`}>
                          {article.title}
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-2 flex-grow">{article.description}</p>
                        <div className="mt-4 flex items-center text-red-400 font-semibold text-sm group-hover:gap-3 transition-all">
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-14">
                <Link href="/research">
                  <Button className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-10 py-6 rounded-2xl text-lg border-2 border-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    View All Research <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <GameModal 
        game={selectedGame} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <style jsx>{`
        @keyframes slide {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50%, -50%); }
        }
        
        @keyframes slideBackground {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-70px, -70px); }
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}