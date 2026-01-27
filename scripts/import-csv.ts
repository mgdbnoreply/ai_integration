import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

async function importCsv() {
  try {
    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), "public", "data")
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // URL of the CSV file
    const csvUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exported-results%20%281%29-HA9i3150cmLhDpzOA9cxYfutJYUuxh.csv"

    // Fetch the CSV file
    const response = await fetch(csvUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`)
    }

    const csvText = await response.text()

    // Parse the CSV to validate it
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    })

    console.log(`Successfully parsed ${records.length} records from CSV`)

    // Write the CSV to a file
    const outputPath = path.join(dataDir, "games.csv")
    fs.writeFileSync(outputPath, csvText)

    console.log(`CSV file saved to ${outputPath}`)
  } catch (error) {
    console.error("Error importing CSV:", error)
  }
}

// Run the import function
importCsv()
