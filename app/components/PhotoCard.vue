<template>
  <div class="photo-card">
    <div class="photo-thumbnail">
      <img :src="thumbnailUrl" :alt="photo.original_filename" />
      <div class="watermark-badge">
        <LockClosedIcon class="badge-icon" />
        워터마크 보호됨
      </div>
    </div>
    
    <div class="photo-info">
      <h4 class="photo-name">{{ photo.original_filename }}</h4>
      <p class="photo-date">
        <CalendarIcon class="info-icon" />
        {{ formatDate(photo.upload_date) }}
      </p>
      <p class="photo-size">
        <DocumentIcon class="info-icon" />
        {{ formatSize(photo.file_size) }}
      </p>
    </div>

    <div class="photo-actions">
      <button @click="downloadPhoto" class="btn-action btn-download">
        <ArrowDownTrayIcon class="action-icon" />
        다운로드
      </button>
      <button @click="deletePhoto" class="btn-action btn-delete">
        <TrashIcon class="action-icon" />
        삭제
      </button>
    </div>
  </div>
</template>

<script setup>
import { 
  LockClosedIcon, 
  CalendarIcon, 
  DocumentIcon,
  ArrowDownTrayIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  photo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'download'])

const config = useRuntimeConfig()

const thumbnailUrl = computed(() => {
  return `${config.public.apiBase}/uploads/photos/${props.photo.stored_filename}`
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const downloadPhoto = () => {
  emit('download', props.photo)
}

const deletePhoto = () => {
  if (confirm('정말 이 사진을 삭제하시겠습니까?')) {
    emit('delete', props.photo.id)
  }
}
</script>

<style scoped>
.photo-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
}

.photo-card:hover {
  background: #222;
  border-color: #3a3a3a;
  transform: translateY(-4px);
}

.photo-thumbnail {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #0a0a0a;
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
  width: 14px;
  height: 14px;
}

.photo-info {
  padding: 16px;
}

.photo-name {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.photo-date, .photo-size {
  font-size: 14px;
  color: #999;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-icon {
  width: 16px;
  height: 16px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.action-icon {
  width: 18px;
  height: 18px;
}

.btn-download {
  background: #ffffff;
  color: #0a0a0a;
}

.btn-download:hover {
  background: #e5e5e5;
}

.btn-delete {
  background: #dc2626;
  color: white;
}

.btn-delete:hover {
  background: #b91c1c;
}
</style>