import { sql } from "@/lib/db"

export default async function DebugPage() {
  let dbStatus = "Unknown"
  let error = null

  try {
    // Simple query to check database connection
    const result = await sql`SELECT 1 as test`
    dbStatus = result.length > 0 && result[0].test === 1 ? "Connected" : "Failed"
  } catch (err) {
    error = err instanceof Error ? err.message : String(err)
    dbStatus = "Error"
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Environment</h2>
        <p>Node.js Environment: {process.env.NODE_ENV}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Database</h2>
        <p>
          Status:{" "}
          <span className={`font-bold ${dbStatus === "Connected" ? "text-green-600" : "text-red-600"}`}>
            {dbStatus}
          </span>
        </p>
        {error && (
          <div className="mt-2 p-3 bg-red-50 text-red-700 rounded border border-red-200 overflow-auto">
            <p className="font-mono text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
