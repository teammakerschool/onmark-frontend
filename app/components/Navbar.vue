<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <NuxtLink to="/" class="logo">
          <span class="logo-text">OnMark</span>
        </NuxtLink>

        <div class="nav-links" v-if="isLoggedIn">
          <NuxtLink to="/dashboard" class="nav-link">대시보드</NuxtLink>
          <NuxtLink to="/upload" class="nav-link">업로드</NuxtLink>
          <button @click="logout" class="btn btn-secondary btn-small">
            <ArrowRightOnRectangleIcon class="icon" />
            로그아웃
          </button>
        </div>

        <div class="nav-links" v-else>
          <NuxtLink to="/login" class="nav-link">로그인</NuxtLink>
          <NuxtLink to="/signup" class="btn btn-primary btn-small">
            시작하기
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token')
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isLoggedIn.value = false
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #2a2a2a;
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  color: #999;
  font-weight: 500;
  transition: color 0.3s;
  font-size: 15px;
}

.nav-link:hover {
  color: #ffffff;
}

.btn-small {
  padding: 8px 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  width: 18px;
  height: 18px;
}
</style>