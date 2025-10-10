<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <NuxtLink to="/" class="logo">
          <span class="logo-icon">🖼️</span>
          <span class="logo-text">OnMark</span>
        </NuxtLink>

        <div class="nav-links" v-if="isLoggedIn">
          <NuxtLink to="/dashboard" class="nav-link">대시보드</NuxtLink>
          <NuxtLink to="/upload" class="nav-link">업로드</NuxtLink>
          <button @click="logout" class="btn btn-secondary">로그아웃</button>
        </div>

        <div class="nav-links" v-else>
          <NuxtLink to="/login" class="nav-link">로그인</NuxtLink>
          <NuxtLink to="/signup" class="btn btn-primary">회원가입</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const router = useRouter()

// 로그인 상태 확인 (localStorage 사용)
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
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
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
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  color: #4F46E5;
}

.logo-icon {
  font-size: 32px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #4B5563;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #4F46E5;
}
</style>