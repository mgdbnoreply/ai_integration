import { NextResponse } from "next/server"
import { parse } from "csv-parse/sync"
import type { GameData } from "@/lib/types"



export async function GET() {
  try {
    // Try to fetch the CSV from the provided URL
    const csvUrl =
      "https://rmgp-archive-data-game-data.tiiny.site/RMGP-Archive-DataGame-Data.csv"

    const response = await fetch(csvUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`)
    }

    const csvText = await response.text()

    // Parse the CSV data
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    }) as GameData[]

    return NextResponse.json(records)
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error)

    // Fallback to sample data if there's an error
    return NextResponse.json(getSampleData())
  }
}

function getSampleData(): GameData[] {
  // Sample data based on the CSV schema
  return [
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
      Articles:
        "https://web.archive.org/web/20150131132526/http://www.tuaw.com/2008/06/09/iphone-3g-announced/ (iPhone 3G announced)",
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
      Articles: "https://www.ign.com/articles/1998/11/06/game-boy-color-arrives (Game Boy Color Launch)",
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
      Articles: "https://www.eurogamer.net/articles/r_ngage_oct2003 (N-Gage Review)",
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
}
