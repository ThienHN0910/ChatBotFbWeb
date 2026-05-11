<script setup lang="ts">
import { computed } from 'vue'
import { getAuthUrl } from '../services/api'

const commandGroups = [
  ['/ask', '/hoi', '/help'],
  ['/time', '/keo', '/mem'],
  ['/top', '/history', '/fb'],
]

const featureCards = [
  {
    title: 'Admin dashboard',
    copy: 'Quản lý knowledge base, user được phép truy cập và điều hướng login bằng Google.',
  },
  {
    title: 'Bot commands',
    copy: 'Giữ lại các lệnh cũ của bot như /ask, /time, /keo, /mem, /top, /history và /fb.',
  },
  {
    title: 'Public routes',
    copy: 'Có đầy đủ page /policy và /term theo đúng nội dung cũ, nhưng được render bằng Vue3.',
  },
]

const loginUrl = computed(() => getAuthUrl())
</script>

<template>
  <section class="page-grid hero-grid">
    <article class="hero-card">
      <div class="hero-kicker">Vue3 frontend · ASP.NET Core API</div>
      <h1 class="hero-title">Control panel cho BotFacebook, sạch hơn và chạy như một app thật.</h1>
      <p class="hero-copy">
        Frontend này thay toàn bộ layer Node cũ: dashboard, policy, term và các hành động CRUD
        đều gọi sang dự án BotFacebook.Api qua fetch với cookie session.
      </p>

      <div class="hero-actions">
        <a class="primary-button" :href="loginUrl">Login với Google</a>
        <RouterLink class="secondary-button" to="/dashboard">Mở dashboard</RouterLink>
        <RouterLink class="ghost-button" to="/policy">Xem policy</RouterLink>
      </div>
    </article>

    <aside class="hero-side">
      <div class="panel">
        <h2 class="section-title">Bot commands</h2>
        <p class="section-copy">Nhóm lệnh vẫn giữ nguyên để bot không đổi hành vi.</p>

        <div class="command-grid" style="margin-top: 18px">
          <div v-for="group in commandGroups" :key="group.join('-')" class="command-card">
            <div class="keywords">
              <span v-for="command in group" :key="command" class="command-pill">{{ command }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <p class="stat-number">Vue 3</p>
          <p class="stat-label">SPA route-driven UI</p>
        </div>
        <div class="stat-card">
          <p class="stat-number">API first</p>
          <p class="stat-label">Toàn bộ thao tác đi qua BotFacebook.Api</p>
        </div>
      </div>
    </aside>
  </section>

  <section class="panel" style="margin-top: 24px">
    <div class="dashboard-toolbar">
      <div>
        <h2 class="section-title">What changed</h2>
        <p class="section-copy">Ba mảng chính: admin, public pages, và bot integration.</p>
      </div>
      <RouterLink class="ghost-button" to="/term">Đi tới term</RouterLink>
    </div>

    <div class="feature-grid" style="margin-top: 18px">
      <article v-for="card in featureCards" :key="card.title" class="feature-card">
        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-copy">{{ card.copy }}</p>
      </article>
    </div>
  </section>
</template>