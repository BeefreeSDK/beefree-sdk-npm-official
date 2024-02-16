import {ILoadConfig} from "../types/bee"
import merge from 'ts-deepmerge'

class LoadConfigAccumulator {
  // Object to accumulate updates
  private accumulatedConfig: ILoadConfig
  // Timer to wait for delay
  private timer: NodeJS.Timeout | null
  // Method to call after delay
  private methodToCall: ((obj: ILoadConfig) => void) | null
  // ms to wait before calling the method
  private readonly delay: number

  constructor(delay: number) {
    console.log('accumulator - init', delay)
    this.accumulatedConfig = {}
    this.timer = null
    this.methodToCall = null
    this.delay = delay
  }

  // Method to update the accumulated object
  updateConfig(update: ILoadConfig): void {
     console.log('LoadConfigAccumulator - updateObject', update)

    // Merge updates into the accumulated object
    this.accumulatedConfig = merge.withOptions({ mergeArrays: false }, this.accumulatedConfig, update)

    // If there's a running timer, reset it
    if (this.timer !== null) {
      clearTimeout(this.timer)
    }

    // Start a new timer
    this.timer = setTimeout(() => {
      // Pass the accumulated object to the specified method
      if (this.methodToCall) {
        console.log('LoadConfigAccumulator - call method', this.accumulatedConfig)
        this.methodToCall(this.accumulatedConfig)
      }
      // Reset the accumulated object
      this.accumulatedConfig = {}
      // Reset the timer
      this.timer = null
    }, this.delay)
  }

  // Method to set the method to call after delay
  setLoadConfigMethod(method: (obj: ILoadConfig) => void): void {
    console.log('LoadConfigAccumulator - setMethodToCall', method)
    this.methodToCall = method
  }
}

export { LoadConfigAccumulator }
