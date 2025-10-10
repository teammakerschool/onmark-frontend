<template>
  <div class="photo-card">
    <div class="photo-thumbnail">
      <img :src="thumbnailUrl" :alt="photo.original_filename" />
      <div class="watermark-badge">
        <span class="badge-icon">🔒</span>
        워터마크 보호됨
      </div>
    </div>
    
    <div class="photo-info">
      <h4 class="photo-name">{{ photo.original_filename }}</h4>
      <p class="photo-date">{{ formatDate(photo.upload_date) }}</p>
      <p class="photo-size">{{ formatSize(photo.file_size) }}</p>
    </div>

    <div class="photo-actions">
      <button @click="downloadPhoto" class="btn-action btn-download">
        📥 다운로드
      </button>
      <button @click="deletePhoto" class="btn-action btn-delete">
        🗑️ 삭제
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  photo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'download'])

const config = useRuntimeConfig()

// 썸네일 URL
const thumbnailUrl = computed(() => {
  return `${config.public.apiBase}/uploads/photos/${props.photo.stored_filename}`
})

// 날짜 포맷
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 파일 크기 포맷
const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// 다운로드
const downloadPhoto = () => {
  emit('download', props.photo)
}

// 삭제
const deletePhoto = () => {
  if (confirm('정말 이 사진을 삭제하시겠습니까?')) {
    emit('delete', props.photo.id)
  }
}
</script>

<style scoped>
.photo-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.photo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.photo-thumbnail {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f3f4f6;
}

.photo-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.watermark-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(34, 197, 94, 0.95);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.badge-icon {
  font-size: 14px;
}

.photo-info {
  padding: 16px;
}

.photo-name {
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.photo-date, .photo-size {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 4px;
}

.photo-actions {
  display: flex;
  gap: 8px;
  padding: 0 16px 16px;
}

.btn-action {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-download {
  background: #4F46E5;
  color: white;
}

.btn-download:hover {
  background: #4338CA;
}

.btn-delete {
  background: #EF4444;
  color: white;
}

.btn-delete:hover {
  background: #DC2626;
}
</style>