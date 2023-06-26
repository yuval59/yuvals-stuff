import { getProjects } from '@/app/dal'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) =>
  NextResponse.json(await getProjects())
