import Link from 'next/link'
import React from 'react'

export default function index() {
  return (
    <div>
      <h1>ホーム画面</h1>
      <Link href={"/list"}>一覧画面へ</Link>
    </div>
  )
}
