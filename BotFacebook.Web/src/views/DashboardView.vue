<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ApiError, getAuthUrl, getLogoutUrl } from '../services/api'
import {
  deleteKnowledgeRecord,
  deleteUserRecord,
  loadKnowledgeRecords,
  loadUserRecords,
  saveKnowledgeRecord,
  saveUserRecord,
  type KnowledgeRecord,
  type UserRecord,
  type UserRole,
} from '../services/dashboard'

const activeTab = ref<'knowledge' | 'users'>('knowledge')
const loading = ref(true)
const saving = ref(false)
const needsLogin = ref(false)
const errorMessage = ref('')
const statusMessage = ref('')
const knowledgeItems = ref<KnowledgeRecord[]>([])
const userItems = ref<UserRecord[]>([])

const knowledgeForm = reactive({
  _id: '',
  topic: '',
  content: '',
  keywords: '',
})

const userForm = reactive({
  _id: '',
  email: '',
  role: 'user' as UserRole,
})

const totalKnowledge = computed(() => knowledgeItems.value.length)
const totalUsers = computed(() => userItems.value.length)
const totalAdmins = computed(() => userItems.value.filter((item) => item.role === 'admin').length)

function formatDate(value?: string) {
  if (!value) return 'Chưa có dữ liệu'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

async function refreshDashboard() {
  loading.value = true
  errorMessage.value = ''
  needsLogin.value = false

  try {
    const [knowledge, users] = await Promise.all([loadKnowledgeRecords(), loadUserRecords()])
    knowledgeItems.value = knowledge
    userItems.value = users
    statusMessage.value = 'Dữ liệu đã được tải từ BotFacebook.Api.'
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      needsLogin.value = true
      statusMessage.value = 'Bạn cần đăng nhập Google để xem dashboard.'
    } else {
      errorMessage.value = error instanceof Error ? error.message : 'Không tải được dashboard'
    }
  } finally {
    loading.value = false
  }
}

function resetKnowledgeForm() {
  knowledgeForm._id = ''
  knowledgeForm.topic = ''
  knowledgeForm.content = ''
  knowledgeForm.keywords = ''
}

function resetUserForm() {
  userForm._id = ''
  userForm.email = ''
  userForm.role = 'user'
}

function editKnowledge(item: KnowledgeRecord) {
  activeTab.value = 'knowledge'
  knowledgeForm._id = item._id
  knowledgeForm.topic = item.topic
  knowledgeForm.content = item.content
  knowledgeForm.keywords = item.keywords.join(', ')
}

function editUser(item: UserRecord) {
  activeTab.value = 'users'
  userForm._id = item._id
  userForm.email = item.email
  userForm.role = item.role === 'admin' ? 'admin' : 'user'
}

async function submitKnowledge() {
  if (!knowledgeForm.topic.trim() || !knowledgeForm.content.trim()) {
    errorMessage.value = 'Nhập đủ topic và content cho knowledge base.'
    return
  }

  saving.value = true
  errorMessage.value = ''

  try {
    await saveKnowledgeRecord({
      _id: knowledgeForm._id || undefined,
      topic: knowledgeForm.topic.trim(),
      content: knowledgeForm.content.trim(),
      keywords: knowledgeForm.keywords.trim(),
    })
    statusMessage.value = knowledgeForm._id ? 'Đã cập nhật knowledge.' : 'Đã tạo knowledge mới.'
    resetKnowledgeForm()
    await refreshDashboard()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Không lưu được knowledge'
  } finally {
    saving.value = false
  }
}

async function submitUser() {
  if (!userForm.email.trim()) {
    errorMessage.value = 'Nhập email cho authorized user.'
    return
  }

  saving.value = true
  errorMessage.value = ''

  try {
    await saveUserRecord({
      _id: userForm._id || undefined,
      email: userForm.email.trim(),
      role: userForm.role,
    })
    statusMessage.value = userForm._id ? 'Đã cập nhật user.' : 'Đã tạo user mới.'
    resetUserForm()
    await refreshDashboard()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Không lưu được user'
  } finally {
    saving.value = false
  }
}

async function removeKnowledge(item: KnowledgeRecord) {
  if (!window.confirm(`Xóa knowledge "${item.topic}"?`)) {
    return
  }

  saving.value = true

  try {
    await deleteKnowledgeRecord(item._id)
    statusMessage.value = 'Đã xóa knowledge.'
    await refreshDashboard()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Không xóa được knowledge'
  } finally {
    saving.value = false
  }
}

async function removeUser(item: UserRecord) {
  if (!window.confirm(`Xóa authorized user ${item.email}?`)) {
    return
  }

  saving.value = true

  try {
    await deleteUserRecord(item._id)
    statusMessage.value = 'Đã xóa user.'
    await refreshDashboard()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Không xóa được user'
  } finally {
    saving.value = false
  }
}

onMounted(refreshDashboard)
</script>

<template>
  <section class="dashboard-shell">
    <header class="dashboard-header">
      <div>
        <div class="dashboard-topline">
          <span class="badge is-online">Connected to BotFacebook.Api</span>
          <span v-if="needsLogin" class="badge is-warning">Session required</span>
          <span v-else class="badge">Cookie session</span>
        </div>
        <h1 class="section-title" style="margin-top: 14px">Dashboard</h1>
        <p class="section-copy">
          Quản lý knowledge base, authorized users và thao tác CRUD thông qua API của backend .NET.
        </p>
      </div>

      <div class="button-row">
        <a class="primary-button" :href="getAuthUrl()">Login với Google</a>
        <a class="secondary-button" :href="getLogoutUrl()">Logout</a>
        <button class="ghost-button" type="button" @click="refreshDashboard">Refresh</button>
      </div>
    </header>

    <div class="dashboard-stats">
      <article class="stat-card">
        <p class="stat-number">{{ totalKnowledge }}</p>
        <p class="stat-label">Knowledge records</p>
      </article>
      <article class="stat-card">
        <p class="stat-number">{{ totalUsers }}</p>
        <p class="stat-label">Authorized users</p>
      </article>
      <article class="stat-card">
        <p class="stat-number">{{ totalAdmins }}</p>
        <p class="stat-label">Admin accounts</p>
      </article>
      <article class="stat-card">
        <p class="stat-number">{{ loading ? '...' : 'Ready' }}</p>
        <p class="stat-label">Runtime state</p>
      </article>
    </div>

    <article v-if="statusMessage" class="info-card">
      <p class="card-copy">{{ statusMessage }}</p>
    </article>

    <article v-if="errorMessage" class="info-card" style="border-color: rgba(255, 127, 131, 0.3)">
      <p class="card-copy">{{ errorMessage }}</p>
    </article>

    <article v-if="needsLogin" class="auth-card">
      <h2 class="section-title">Login required</h2>
      <p class="section-copy">
        Mở Google OAuth từ backend để tạo session cookie rồi quay lại dashboard.
      </p>
      <div class="button-row">
        <a class="primary-button" :href="getAuthUrl()">Login với Google</a>
        <RouterLink class="ghost-button" to="/policy">Policy</RouterLink>
        <RouterLink class="ghost-button" to="/term">Term</RouterLink>
      </div>
    </article>

    <section class="panel">
      <div class="dashboard-toolbar">
        <div class="tab-bar" role="tablist" aria-label="Dashboard sections">
          <button
            class="tab-button"
            :class="{ 'is-active': activeTab === 'knowledge' }"
            type="button"
            @click="activeTab = 'knowledge'"
          >
            Knowledge
          </button>
          <button
            class="tab-button"
            :class="{ 'is-active': activeTab === 'users' }"
            type="button"
            @click="activeTab = 'users'"
          >
            Users
          </button>
        </div>

        <div class="quick-links">
          <RouterLink to="/policy">Policy</RouterLink>
          <RouterLink to="/term">Term</RouterLink>
        </div>
      </div>
    </section>

    <div v-if="loading" class="empty-state">Loading dashboard data...</div>

    <section v-else class="split-layout">
      <article class="form-card">
        <div v-if="activeTab === 'knowledge'" class="form-grid">
          <div>
            <h2 class="section-title">Knowledge editor</h2>
            <p class="section-copy">Tạo hoặc cập nhật knowledge base để /ask có thêm ngữ cảnh.</p>
          </div>

          <div class="field-grid">
            <div class="field">
              <label for="knowledge-topic">Topic</label>
              <input id="knowledge-topic" v-model="knowledgeForm.topic" class="input" type="text" placeholder="Ví dụ: booking" />
            </div>

            <div class="field">
              <label for="knowledge-keywords">Keywords</label>
              <input id="knowledge-keywords" v-model="knowledgeForm.keywords" class="input" type="text" placeholder="booking, lịch hẹn, đặt chỗ" />
            </div>
          </div>

          <div class="field">
            <label for="knowledge-content">Content</label>
            <textarea id="knowledge-content" v-model="knowledgeForm.content" class="textarea" placeholder="Nội dung trả lời hoặc tri thức lưu trữ"></textarea>
          </div>

          <p class="helper-text">
            {{ knowledgeForm._id ? 'Đang sửa mục knowledge hiện tại.' : 'Tạo mới knowledge record.' }}
          </p>

          <div class="button-row">
            <button class="primary-button" type="button" :disabled="saving" @click="submitKnowledge">
              {{ saving ? 'Saving...' : knowledgeForm._id ? 'Update knowledge' : 'Create knowledge' }}
            </button>
            <button class="secondary-button" type="button" @click="resetKnowledgeForm">Clear</button>
          </div>
        </div>

        <div v-else class="form-grid">
          <div>
            <h2 class="section-title">Authorized user editor</h2>
            <p class="section-copy">Thêm email được phép truy cập dashboard và gán role.</p>
          </div>

          <div class="field-grid">
            <div class="field">
              <label for="user-email">Email</label>
              <input
                id="user-email"
                v-model="userForm.email"
                class="input"
                :disabled="Boolean(userForm._id)"
                type="email"
                placeholder="admin@example.com"
              />
            </div>

            <div class="field">
              <label for="user-role">Role</label>
              <select id="user-role" v-model="userForm.role" class="select">
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>

          <p class="helper-text">
            {{ userForm._id ? 'Đang sửa role của user hiện tại.' : 'Tạo mới authorized user.' }}
          </p>

          <div class="button-row">
            <button class="primary-button" type="button" :disabled="saving" @click="submitUser">
              {{ saving ? 'Saving...' : userForm._id ? 'Update user' : 'Create user' }}
            </button>
            <button class="secondary-button" type="button" @click="resetUserForm">Clear</button>
          </div>
        </div>
      </article>

      <article class="panel">
        <div v-if="activeTab === 'knowledge'" class="entity-list">
          <div v-if="knowledgeItems.length === 0" class="empty-state">
            Chưa có knowledge nào.
          </div>

          <div v-for="item in knowledgeItems" :key="item._id" class="list-item">
            <div class="list-head">
              <div>
                <h3 class="item-title">{{ item.topic }}</h3>
                <p class="muted-copy">Updated: {{ formatDate(item.updatedAt ?? item.createdAt) }}</p>
              </div>

              <div class="button-row">
                <button class="ghost-button" type="button" @click="editKnowledge(item)">Edit</button>
                <button class="secondary-button" type="button" @click="removeKnowledge(item)">Delete</button>
              </div>
            </div>

            <p class="item-copy">{{ item.content }}</p>

            <div class="keywords">
              <span v-for="keyword in item.keywords" :key="keyword" class="keyword-chip">{{ keyword }}</span>
            </div>
          </div>
        </div>

        <div v-else class="entity-list">
          <div v-if="userItems.length === 0" class="empty-state">
            Chưa có authorized user nào.
          </div>

          <div v-for="item in userItems" :key="item._id" class="list-item">
            <div class="list-head">
              <div>
                <h3 class="item-title">{{ item.email }}</h3>
                <p class="muted-copy">Updated: {{ formatDate(item.updatedAt ?? item.createdAt) }}</p>
              </div>

              <div class="button-row">
                <span class="status-badge" :class="item.role === 'admin' ? 'is-online' : ''">{{ item.role }}</span>
                <button class="ghost-button" type="button" @click="editUser(item)">Edit</button>
                <button class="secondary-button" type="button" @click="removeUser(item)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  </section>
</template>