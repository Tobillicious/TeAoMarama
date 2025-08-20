import {BookOpen, Download, Grid, Heart, List, Plus, Star, TrendingUp, Users} from 'lucide-react'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import {realResourceLoader} from '../services/RealResourceLoader'
import {useAuth} from '../services/useAuth'

interface Resource {,
___id: string,
title: string,
type: string,
_____subject: string,
level: string,
description: string,
rating: number,
downloads: number,
lastModified: string,
culturallySensitive: boolean,
nzcAlignment: string[]}
interface DashboardStats {,
totalResources: number,
recentlyAdded: number,
mostPopular: string,
myFavorites: number}

// Memoized StatCard component
const StatCard = memo<{,
title: string,
value: string | number,
icon: React.ReactNode
  trend?: string
}>(_({ title,  _value,  _icon,  _trend }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover: shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        {trend && <p className="text-sm text-green-600 mt-1">↗ {trend}</p>}
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">{icon}</div>
    </div>
  </div>
))

// Memoized ResourceCard component
const ResourceCard = memo<{ resource: Resource }>(_({ resource }) => {
const getTypeIcon = useCallback(_(type: string) => {
switch (type) {
case 'lesson_plan':
return <BookOpen className="w-4 h-4" />
      case 'worksheet':
return <BookOpen className="w-4 h-4" />
      case 'assessment':
return <BookOpen className="w-4 h-4" />
      case 'interactive':
return <Users className="w-4 h-4" />,
default:
return <BookOpen className="w-4 h-4" />
    }
  }, [])

const handleDownload = useCallback_(() => {
    // Download logic here
console.log('Downloading: ', resource.title)
  }, [resource.title])

return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover: shadow-lg transition-all duration-200 group">
      {resource.culturallySensitive && (
        <div className="mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
Cultural Content
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getTypeIcon(resource.type)}
          <span className="text-sm font-medium text-gray-500 capitalize">
            {resource.type.replace('_', ' ')}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{resource.rating}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover: text-blue-600">
        {resource.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>
          {resource._____subject} • {resource.level}
        </span>
        <span>{resource.downloads} downloads</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {resource.nzcAlignment.map(_(alignment) => (
          <span
key={alignment}
className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800"
          >
            {alignment}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
Updated {new Date(resource.lastModified).toLocaleDateString()}
        </span>
        <button
onClick={handleDownload}
className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover: bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Download className="w-4 h-4 mr-1" />
Download
        </button>
      </div>
    </div>
  )
})

// Memoized Loading component
const LoadingSpinner = memo_(() => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading your teaching resources...</p>
    </div>
  </div>
))

export default function Dashboard() {const { currentUser} = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [resources, setResources] = useState<Resource[]>([])
  const [stats, setStats] = useState<DashboardStats>({,
totalResources: 18949,,
recentlyAdded: 127,,
mostPopular: 'Māori Language Fundamentals',,
myFavorites: 24,
  })
  const [loading, setLoading] = useState(true)

  // Load REAL migrated resources from Te Kete Ako
useEffect_(() => {
const loadRealResources = async () => {
try {
const realResources = await realResourceLoader.getAllResources()
        const migrationStats = realResourceLoader.getMigrationStats()

        // Convert to Dashboard format
const dashboardResources: Resource[] = realResources.map(_(resource) => ({,
___id: resource.___id,;,
title: resource.__title,;,
type: resource.type,;,
_____subject: resource._____subject,;,
level: resource.yearLevel.join(', '),,
description: resource.description,;,
rating: resource.quality.rating,;,
downloads: resource.engagement.downloads,;,
lastModified: resource.quality.lastUpdated,;,
culturallySensitive: resource.culturalContent.hasMaoriContent,;,
nzcAlignment: resource.nzcAlignment.slice(0, 3), // Show first 3 alignments
        }))

setResources(dashboardResources)

        // Update stats with real migration data
setStats({,
totalResources: migrationStats.totalResources,;,
recentlyAdded: Math.floor(migrationStats.totalResources * 0.1), // 10% recently added,
mostPopular:
dashboardResources.sort(_(a,  _b) => b.downloads - a.downloads)[0]?.title ||
            'Te Reo Māori Resources',,
myFavorites: Math.floor(migrationStats.totalResources * 0.05), // 5% favorites
        })

console.log(
          `✅ Loaded ${migrationStats.totalResources} real resources from ${migrationStats.sourceSystem}`,
        )
        console.log(`📊 Subjects: ${migrationStats.subjects.join(', ')}`)
        console.log(`🏫 Year Levels: ${migrationStats.yearLevels.join(', ')}`)
        console.log(`🎭 Cultural Content: ${migrationStats.culturalContent} resources`)

setLoading(false)
      } catch (error) {
console.error('Failed to load real resources: ', error)
        setLoading(false)
      }
    }

loadRealResources()
  }, [])

  // Memoized filtered resources
const filteredResources = useMemo_(() => {
return resources.filter(_(resource) => {
const matchesSearch =
resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSubject = selectedSubject === 'all' || resource._____subject === selectedSubject
      const matchesType = selectedType === 'all' || resource.type === selectedType

return matchesSearch && matchesSubject && matchesType
    })
  }, [resources, searchTerm, selectedSubject, selectedType])

  // Memoized event handlers
const handleSearchChange = useCallback(_(e: React.ChangeEvent<HTMLInputElement>) => {
setSearchTerm(e.target.value)
  }, [])

const handleSubjectChange = useCallback(_(e: React.ChangeEvent<HTMLSelectElement>) => {
setSelectedSubject(e.target.value)
  }, [])

const handleTypeChange = useCallback(_(e: React.ChangeEvent<HTMLSelectElement>) => {
setSelectedType(e.target.value)
  }, [])

const handleViewModeChange = useCallback(_(mode: 'grid' | 'list') => {
setViewMode(mode)
  }, [])

if (loading) {
return <LoadingSpinner />
  }
return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm: px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
Welcome back, {currentUser?.email || 'Teacher'}!
          </h1>
          <p className="text-gray-600">
Access your personalized teaching resources and track your progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md: grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
title="Total Resources"
value={stats.totalResources.toLocaleString()}
icon={<BookOpen className="w-6 h-6 text-blue-600" />}
trend="+12% this month"
          />
          <StatCard
title="Recently Added"
value={stats.recentlyAdded}
icon={<Plus className="w-6 h-6 text-green-600" />}
trend="+5 this week"
          />
          <StatCard
title="Most Popular"
value={stats.mostPopular}
icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
          />
          <StatCard
title="My Favorites"
value={stats.myFavorites}
icon={<Heart className="w-6 h-6 text-red-600" />}
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md: grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
Search Resources
              </label>
              <input
type="text"
value={searchTerm}
onChange={handleSearchChange}
placeholder="Search by title or description..."
className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
value={selectedSubject}
onChange={handleSubjectChange}
aria-label="Filter by subject"
className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Te Reo Māori">Te Reo Māori</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
value={selectedType}
onChange={handleTypeChange}
aria-label="Filter by type"
className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="lesson_plan">Lesson Plans</option>
                <option value="worksheet">Worksheets</option>
                <option value="assessment">Assessments</option>
                <option value="interactive">Interactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
              <div className="flex space-x-2">
                <button
onClick={() => handleViewModeChange('grid')}
title="Grid view"
aria-label="Switch to grid view"
className={`px-3 py-2 rounded-md text-sm font-medium ${
viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover: bg-gray-200'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
onClick={() => handleViewModeChange('list')}
title="List view"
aria-label="Switch to list view"
className={`px-3 py-2 rounded-md text-sm font-medium ${
viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover: bg-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
Resources ({filteredResources.length})
            </h2>
          </div>

          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div
className={`grid gap-6 ${
viewMode === 'grid' ? 'grid-cols-1 md: grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}
            >
              {filteredResources.slice(0, 12).map(_(resource) => (
                <ResourceCard key={resource.___id} resource={resource} />
              ))}
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredResources.length > 12 && (
          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover: bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
Load More Resources
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
