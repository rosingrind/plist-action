import * as core from '@actions/core'
import * as plist from 'plist'

export function parsePlist(sourceInput: string, prettyInput = false): string {
  return prettyInput
    ? JSON.stringify(plist.parse(sourceInput), null, 2)
    : JSON.stringify(plist.parse(sourceInput), null, 0)
}

export function parseJson(sourceInput: string, prettyInput = false): string {
  return prettyInput
    ? plist.build(JSON.parse(sourceInput), {pretty: true})
    : plist.build(JSON.parse(sourceInput), {pretty: false})
}

async function run(): Promise<void> {
  try {
    const sourceInput = core.getInput('source')
    const formatInput = core.getInput('format')
    const prettyInput = core.getInput('pretty') === 'true'

    switch (formatInput) {
      case 'plist':
        core.setOutput('target', parsePlist(sourceInput, prettyInput))
        core.debug(parsePlist(sourceInput, prettyInput))
        break
      case 'json':
        core.setOutput('target', parseJson(sourceInput, prettyInput))
        core.debug(parseJson(sourceInput, prettyInput))
        break
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
