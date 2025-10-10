<template>
  <div>
    <Navbar />
    
    <div class="dashboard-page">
      <div class="container">
        <div class="dashboard-header">
          <div>
            <h1>대시보드</h1>
            <p class="welcome-text">안녕하세요, {{ username }}님! 👋</p>
          </div>
          
          <NuxtLink to="/upload" class="btn btn-primary">
            <PlusIcon class="header-icon" />
            새 사진 업로드
          </NuxtLink>
        </div>

        <div class="stats">
          <div class="stat-card">
            <PhotoIcon class="stat-icon" />
            <div class="stat-info">
              <h3>{{ photos.length }}</h3>
              <p>총 사진</p>
            </div>
          </div>
          
          <div class="stat-card">
            <ShieldCheckIcon class="stat-icon" />
            <div class="stat-info">
              <h3>{{ photos.length }}</h3>
              <p>보호된 사진</p>
            </div>
          </div>
          
          <div class="stat-card">
            <CircleStackIcon class="stat-icon" />
            <div class="stat-info">
              <h3>{{ totalSize }}</h3>
              <p>총 용량</p>
            </div>
          </div>
        </div>

        <div class="photos-section">
          <h2>내 사진</h2>
          
          <div v-if="loading" class="loading">
            <div class="spinner"></div>
            <p>불러오는 중...</p>
          </div>

          <div v-else-if="photos.length === 0" class="empty-state">
            <PhotoIcon class="empty-icon" />
            <h3>아직 업로드한 사진이 없습니다</h3>
            <p>첫 번째 사진을 업로드해보세요!</p>
            <NuxtLink to="/upload" class="btn btn-primary">
              <CloudArrowUpIcon class="btn-icon" />
              사진 업로드하기
            </NuxtLink>
          </div>

          <div v-else class="photos-grid">
            <PhotoCard 
              v-for="photo in photos" 
              :key="photo.id"
              :photo="photo"
              @download="downloadPhoto"
              @delete="deletePhoto"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  PhotoIcon, 
  ShieldCheckIcon, 
  CircleStackIcon,
  PlusIcon,
  CloudArrowUpIcon
} from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()
const router = useRouter()

const photos = ref([])
const loading = ref(true)
const username = ref('')

// 로그인 확인 및 사용자 정보 가져오기
onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('로그인이 필요합니다')
    router.push('/login')
    return
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  username.value = user.username || '사용자'
  
  fetchPhotos()
})

// 사진 목록 가져오기
const fetchPhotos = async () => {
  const token = localStorage.getItem('token')
  loading.value = true
  
  try {
    const response = await fetch(`${config.public.apiBase}/api/photos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()
    
    if (response.ok) {
      photos.value = data.photos
    } else {
      console.error('사진 목록 조회 실패')
    }
  } catch (error) {
    console.error('서버 연결 실패:', error)
  } finally {
    loading.value = false
  }
}

// 총 용량 계산
const totalSize = computed(() => {
  const bytes = photos.value.reduce((sum, photo) => sum + photo.file_size, 0)
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
})

// 다운로드
const downloadPhoto = async (photo) => {
  const token = localStorage.getItem('token')
  
  try {
    const response = await fetch(
      `${config.public.apiBase}/api/photos/${photo.id}/download`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      alert('다운로드 실패')
      return
    }

    // Blob으로 변환
    const blob = await response.blob()
    
    // 다운로드 링크 생성
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = photo.original_filename
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    
    // 정리
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 100)
  } catch (error) {
    alert('다운로드 실패')
    console.error(error)
  }
}

// 삭제
const deletePhoto = async (photoId) => {
  const token = localStorage.getItem('token')
  
  try {
    const response = await fetch(`${config.public.apiBase}/api/photos/${photoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      alert('사진이 삭제되었습니다')
      fetchPhotos()
    }
  } catch (error) {
    alert('삭제 실패')
  }
}
</script>

<style scoped>
.dashboard-page {
  background: #0a0a0a;
  min-height: calc(100vh - 80px);
  padding: 40px 0;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.dashboard-header h1 {
  font-size: 36px;
  color: #ffffff;
  margin-bottom: 8px;
}

.welcome-text {
  color: #999;
  font-size: 18px;
}

.header-icon {
  width: 20px;
  height: 20px;
}

.dashboard-header .btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}

.stat-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s;
}

.stat-card:hover {
  background: #222;
  border-color: #3a3a3a;
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  color: #ffffff;
  flex-shrink: 0;
}

.stat-info h3 {
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 4px;
}

.stat-info p {
  color: #999;
  font-size: 14px;
}

.photos-section h2 {
  font-size: 28px;
  margin-bottom: 24px;
  color: #ffffff;
}

.loading {
  text-align: center;
  padding: 60px 0;
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  border: 5px solid #333;
  border-top: 5px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  color: #555;
  margin: 0 auto 20px;
}

.empty-state h3 {
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 12px;
}

.empty-state p {
  color: #999;
  margin-bottom: 24px;
}

.empty-state .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
</style>