import { requestJson } from './api'

export interface KnowledgeRecord {
  _id: string
  topic: string
  content: string
  keywords: string[]
  createdAt?: string
  updatedAt?: string
}

export interface UserRecord {
  _id: string
  email: string
  role: string
  createdAt?: string
  updatedAt?: string
}

export type UserRole = 'user' | 'admin'

export async function loadKnowledgeRecords() {
  return requestJson<KnowledgeRecord[]>('/api/dashboard?type=knowledge')
}

export async function loadUserRecords() {
  return requestJson<UserRecord[]>('/api/dashboard?type=users')
}

export async function saveKnowledgeRecord(input: {
  _id?: string
  topic: string
  content: string
  keywords: string
}) {
  return requestJson<KnowledgeRecord>('/api/dashboard', {
    method: input._id ? 'PUT' : 'POST',
    body: JSON.stringify({
      type: 'knowledge',
      ...(input._id ? { _id: input._id } : {}),
      topic: input.topic,
      content: input.content,
      keywords: input.keywords,
    }),
  })
}

export async function deleteKnowledgeRecord(id: string) {
  return requestJson<string>('/api/dashboard', {
    method: 'DELETE',
    body: JSON.stringify({ type: 'knowledge', _id: id }),
  })
}

export async function saveUserRecord(input: {
  _id?: string
  email: string
  role: UserRole
}) {
  return requestJson<UserRecord>('/api/dashboard', {
    method: input._id ? 'PUT' : 'POST',
    body: JSON.stringify({
      type: 'users',
      ...(input._id ? { _id: input._id } : {}),
      email: input.email,
      role: input.role,
    }),
  })
}

export async function deleteUserRecord(id: string) {
  return requestJson<string>('/api/dashboard', {
    method: 'DELETE',
    body: JSON.stringify({ type: 'users', _id: id }),
  })
}