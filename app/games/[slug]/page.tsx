import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { GameData } from "@/lib/types"

// This would typically be a server-side function to fetch game data
async function getGameData(slug: string): Promise<GameData | null> {
  // In a real application, you would fetch this from a database or API
  // For this example, we'll use sample data
  const sampleGames = [
    {
      Title: "iPhone 3G",
      Year: "2008",
      Developers: "Apple",
      City: "San Francisco",
      Country: "USA",
      URL: "https://www.apple.com",
      Description:
        "Touch screen mobile phone, which includes GPS, 3G capability, and supported gameplay. This is the second iteration of the Apple iPhone and the first to feature the App Store.",
      Pictures: "https://cdn.chass.ncsu.edu/sites/mglab.chass.ncsu.edu/iphone.JPG",
      Documentation: "https://www.youtube.com/watch?v=r7fVWjgxRwk",
      Articles: "https://web.archive.org/web/20150131132526/http://www.tuaw.com/2008/06/09/iphone-3g-announced/",
      Purpose: "Entertainment, Interaction, Art",
      "Open Source": "N",
      "# Players": "multiplayer",
      Location: "site-specific",
      Genre: "Mobile",
      Hardware: "Cell Phone, GPS, Camera Phone, Game Console",
      Connectivity: "Internet, SMS, Voice, Voicemail, Cell-ID, Bluetooth, Pictures, GPS",
      Contact: "contact@example.com",
    },
    {
      Title: "Game Boy Color",
      Year: "1998",
      Developers: "Nintendo",
      City: "Kyoto",
      Country: "Japan",
      URL: "https://www.nintendo.com",
      Description:
        "The Game Boy Color is a handheld game console manufactured by Nintendo. It was released on October 21, 1998 in Japan and was the successor to the Game Boy.",
      Pictures:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/GameboyColor_Purple_FL.jpg/1200px-GameboyColor_Purple_FL.jpg",
      Documentation: "https://www.youtube.com/watch?v=xaNDrVWXvZA",
      Articles: "https://www.ign.com/articles/1998/11/06/game-boy-color-arrives",
      Purpose: "Entertainment",
      "Open Source": "N",
      "# Players": "single player, multiplayer (link cable)",
      Location: "portable",
      Genre: "Handheld Console",
      Hardware: "Handheld Console, Color Screen, Link Cable",
      Connectivity: "Link Cable",
      Contact: "contact@example.com",
    },
    {
      Title: "Nokia N-Gage",
      Year: "2003",
      Developers: "Nokia",
      City: "Espoo",
      Country: "Finland",
      URL: "https://www.nokia.com",
      Description:
        "The N-Gage was a smartphone and handheld game system from Nokia, released on October 7, 2003. It attempted to combine a mobile phone with a handheld game system.",
      Pictures:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Nokia_N-Gage_Silver.jpg/1200px-Nokia_N-Gage_Silver.jpg",
      Documentation: "https://www.youtube.com/watch?v=uCYMRGtH7GU",
      Articles: "https://www.eurogamer.net/articles/r_ngage_oct2003",
      Purpose: "Entertainment, Communication",
      "Open Source": "N",
      "# Players": "single player, multiplayer (Bluetooth)",
      Location: "portable",
      Genre: "Mobile, Handheld Console",
      Hardware: "Cell Phone, Game Console, Bluetooth",
      Connectivity: "Bluetooth, Internet, SMS, Voice",
      Contact: "contact@example.com",
    },
  ]

  const normalizedSlug = slug.toLowerCase()
  const game = sampleGames.find((g) => g.Title.replace(/\s+/g, "-").toLowerCase() === normalizedSlug)
  return game || null
}

// Get first image from comma-separated list
function getFirstImage(imageString: string) {
  if (!imageString) return "/images/placeholder.png"
  const images = imageString.split(",")
  return images[0].trim()
}

export default async function GamePage({ params }: { params: { slug: string } }) {
  const game = await getGameData(params.slug)

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
            <p className="mb-6">The game you're looking for doesn't exist in our database.</p>
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <Image
                src={getFirstImage(game.Pictures) || "/placeholder.svg"}
                alt={game.Title}
                width={600}
                height={400}
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{game.Title}</h1>
              <p className="text-gray-500 mb-4">
                {game.Year} • {game.Developers}
              </p>
              <p className="mb-6">{game.Description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Genre</h3>
                  <p className="text-gray-600">{game.Genre}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Players</h3>
                  <p className="text-gray-600">{game["# Players"]}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Hardware</h3>
                  <p className="text-gray-600">{game.Hardware}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Connectivity</h3>
                  <p className="text-gray-600">{game.Connectivity}</p>
                </div>
              </div>

              {game.URL && (
                <div className="mt-6">
                  <Button asChild>
                    <a href={game.URL} target="_blank" rel="noopener noreferrer">
                      Visit Official Website
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Additional Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Documentation</h3>
                {game.Documentation ? (
                  <div className="space-y-2">
                    {game.Documentation.split(",").map((doc, index) => (
                      <a
                        key={index}
                        href={doc.trim()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:underline"
                      >
                        Documentation {index + 1}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No documentation available</p>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Articles</h3>
                {game.Articles ? (
                  <div className="space-y-2">
                    {game.Articles.split(",").map((article, index) => (
                      <a
                        key={index}
                        href={article.trim().split(" ")[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:underline"
                      >
                        {article.includes("(")
                          ? article.substring(article.indexOf("(") + 1, article.indexOf(")"))
                          : `Article ${index + 1}`}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No articles available</p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-2">Location</h3>
              <p>
                {game.City}, {game.Country}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-2">Contact</h3>
              <p>{game.Contact}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
