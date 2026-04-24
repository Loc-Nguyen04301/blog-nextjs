import type { MetadataRoute } from 'next'

const BASE_URL = 'https://locnguyenwriter.com'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

const STATIC_ROUTES: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/video`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/gioi-thieu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const response = await fetch(`${API_URL}/blog?itemsPerPage=1000&page=1`, {
            next: { revalidate: 3600 },
        })
        if (!response.ok) return STATIC_ROUTES

        const json = await response.json()
        const blogs: Array<{ id: string; updatedAt?: string; createdAt?: string }> =
            json?.data?.blogs ?? []

        const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
            url: `${BASE_URL}/blog/${blog.id}`,
            lastModified: blog.updatedAt ?? blog.createdAt ?? new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.7,
        }))

        return [...STATIC_ROUTES, ...blogRoutes]
    } catch {
        return STATIC_ROUTES
    }
}
