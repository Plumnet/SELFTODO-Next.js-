
import React from 'react'

export const Select:any = (props:any) => {

    const hoge = props

  return (
    <>
    <select
    value={"inProg"}
    // onChange={(e) => handleStatusChange(todo, e)}
    >
    <option value="notStarted">未着手</option>
    <option value="inProgress">作業中</option>
    <option value="done">完了</option>
    </select>
    {hoge}
    </>
  )
}

