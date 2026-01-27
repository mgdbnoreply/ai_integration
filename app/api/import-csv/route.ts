import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
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

    // Write the CSV to a file
    const outputPath = path.join(dataDir, "games.csv")
    fs.writeFileSync(outputPath, csvText)

    return NextResponse.json({
      success: true,
      message: "CSV file imported successfully",
    })
  } catch (error) {
    console.error("Error importing CSV:", error)
    return NextResponse.json(
      { success: false, message: "Failed to import CSV file", error: String(error) },
      { status: 500 },
    )
  }
}
