import { useEffect } from "react"

const ItemListPage = () => {
  useEffect(() => {
    console.log('hi')
  }, [])
  return (
    <div>
      <h1>ITEM LIST</h1>
    </div>
  )
}

export default ItemListPage
