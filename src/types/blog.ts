export interface Blog {
  id: string
  title: string
  description: string
  category: string
  imageURL: string
  content: string
  createdAt: string
  author: {
    username: string
    id: string
  }
}
