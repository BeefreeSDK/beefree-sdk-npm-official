
import type { Config } from '@jest/types'
import { defaults } from 'jest-config'

export default async (): Promise<Config.InitialOptions> => {
    return {
        verbose: true,
        preset: 'ts-jest',
        moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
        transform: {
            "^.+\\.(js|css|png|jpg|jpeg|gif|svg)$": "<rootDir>/config/jest/fileTransform.js"
        },
        transformIgnorePatterns: [
            "node_modules/*"
        ]
    }
}