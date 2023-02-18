import { parseJson, parsePlist } from "../src/main";
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'
import * as fs from "fs";

const plistTestSourcePath = path.join(__dirname, 'source.plist')
const jsonTestSourcePath = path.join(__dirname, 'source.json')

test('parse plist', () => {
  const parsed = parsePlist(fs.readFileSync(plistTestSourcePath, 'utf8'))
  const read = JSON.parse(fs.readFileSync(jsonTestSourcePath, 'utf8'))
  expect(parsed).toEqual(JSON.stringify(read))
})

test('parse json', () => {
  const parsed = parseJson(fs.readFileSync(jsonTestSourcePath, 'utf8'))
  const read = fs.readFileSync(plistTestSourcePath, 'utf8')
  expect(parsed).toEqual(read)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_SOURCE'] = fs.readFileSync(plistTestSourcePath, 'utf8')
  process.env['INPUT_FORMAT'] = 'plist'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
