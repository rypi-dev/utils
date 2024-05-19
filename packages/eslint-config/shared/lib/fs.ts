import fs from 'node:fs'
import path from 'node:path'

export const readJson = <T>(root: string, file: string): T | null => {
  const fullpath = path.resolve(root, file)

  if (!fs.existsSync(fullpath)) {
    return null
  }

  const data = fs.readFileSync(fullpath, 'utf-8')

  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}
