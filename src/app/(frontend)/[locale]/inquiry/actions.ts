'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

interface InquiryData {
  name: string
  email: string
  phone: string
  serviceSlug: string
  message: string
}

export async function createInquiryAction(data: InquiryData) {
  try {
    const payload = await getPayload({ config })
    
    // Find the service ID using the slug
    let serviceId: string | undefined = undefined
    if (data.serviceSlug) {
      const services = await payload.find({
        collection: 'services',
        where: {
          slug: {
            equals: data.serviceSlug,
          },
        },
        limit: 1,
      })
      
      if (services.docs.length > 0) {
        serviceId = services.docs[0].id
      }
    }

    // Save the inquiry in the database
    await payload.create({
      collection: 'inquiries',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: serviceId || null,
        message: data.message,
        status: 'pending',
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return { success: false, error: 'Failed to submit inquiry' }
  }
}
