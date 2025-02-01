import { z } from 'zod'

const ResourceType = z.enum(['ARTICLE', 'VIDEO','QUIZ'])

export const resourceSchema = z.object({
    title: z.string().max(100).nonempty("Required"),
    description: z.string().nonempty("Required"),
    type: ResourceType,
    category: z.string(),
})