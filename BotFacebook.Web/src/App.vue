<script setup lang="ts">
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Policy', to: '/policy' },
  { label: 'Term', to: '/term' },
]
</script>

<template>
  <div class="app-shell">
    <div class="orb orb-one"></div>
    <div class="orb orb-two"></div>

    <header class="topbar glass-panel">
      <div class="brand-mark">BF</div>
      <div class="brand-copy">
        <span class="eyebrow">BotFacebook</span>
        <strong>Vue3 control surface</strong>
      </div>

      <nav class="nav-links" aria-label="Main navigation">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          active-class="is-active"
          exact-active-class="is-active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </header>

    <main class="page-frame">
      <RouterView />
    </main>
  </div>
</template>
