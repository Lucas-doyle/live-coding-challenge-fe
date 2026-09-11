export type Category = {
  id: number
  pageType: string
  pageTitle: string
  isActive: boolean
  content: string
}

export type ApiErrorBody = {
  message: string
}
