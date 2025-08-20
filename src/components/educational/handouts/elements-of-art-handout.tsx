import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface ElementsOfArtHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const ElementsOfArtHandout: React.FC<ElementsOfArtHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="elements-of-art-handout">
      <Card title="Elements of Art Handout" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Elements of Art Handout</h1>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌿 {culturalContext}</span>
          </div>
        </div>

        <div className="handout-content">
          <div 
className="te-kete-content"
dangerouslySetInnerHTML={{ __html: `
            <!-- Elements Grid Section -->
            <section class="mb-4">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <!-- Line -->
                    <div class="art-element">
                        <h2 class="font-bold text-lg text-red-600 mb-1" class="wiley-section-title">Line</h2>
                        <p class="text-gray-600 mb-2">A mark made on a surface. Can be straight, curved, thick, thin, etc.</p>
                        <div class="h-10 bg-white flex items-center justify-center"><img src="https: //i.imgur.com/1n2pZ5x.png" alt="Educational diagram showing different types of lines used in art: straight horizontal and vertical lines, curved lines, zigzag lines, dotted lines, and diagonal lines demonstrating the variety of marks artists can make" class="h-8"></div>
                    </div>
                    <!-- Shape -->
                    <div class="art-element">
                        <h2 class="font-bold text-lg text-blue-600 mb-1" class="wiley-section-title">Shape</h2>
                        <p class="text-gray-600 mb-2">A 2D area enclosed by a line. Can be geometric or organic.</p>
                        <div class="h-10 bg-white flex items-center justify-center"><img src="https: //i.imgur.com/sQFfFwD.png" alt="Visual comparison of geometric shapes including circles, squares, triangles, and rectangles alongside organic shapes like leaf forms, cloud-like shapes, and irregular natural forms showing the difference between man-made and nature-inspired shapes" class="h-8"></div>
                    </div>
                    <!-- Form -->
                    <div class="art-element">
                        <h2 class="font-bold text-lg text-green-600 mb-1" class="wiley-section-title">Form</h2>
                        <p class="text-gray-600 mb-2">A 3D object that has height, width, and depth.</p>
                        <div class="h-10 bg-white flex items-center justify-center"><img src="https: //i.imgur.com/GEXf2Yc.png" alt="Three-dimensional forms including a cube showing geometric edges and corners, a sphere with rounded surface, and a cylinder demonstrating how shapes become forms when they have height, width, and depth" class="h-8"></div>
                    </div>
                    <!-- Colour -->
                    <div class="art-element">
                        <h2 class="font-bold text-lg text-purple-600 mb-1" class="wiley-section-title">Colour</h2>
                        <p class="text-gray-600 mb-2">The element of art that is produced when light, striking an object, is reflected back to the eye.</p>
                        <div class="h-10 bg-white flex items-center justify-center"><img src="https: //i.imgur.com/N2m5D5A.png" alt="Traditional color wheel showing primary colors (red, blue, yellow), secondary colors (green, orange, purple), and tertiary colors arranged in a circular pattern to demonstrate color relationships and how colors mix to create new hues" class="h-8"></div>
                    </div>
                    <!-- Texture -->
                    <div class="art-element">
                        <h2 class="font-bold text-lg text-orange-600 mb-1" class="wiley-section-title">Texture</h2>
                        <p class="text-gray-600 mb-2">The way something feels or looks like it would feel.</p>
                        <div class="h-10 bg-white flex items-center justify-center"><img src="https: //i.imgur.com/M5B4G2E.png" alt="Visual examples of different textures including smooth surfaces, rough bark-like textures, soft fuzzy materials, hard metallic surfaces, and bumpy textures showing how artists can create the illusion of how things feel through visual techniques" class="h-8"></div>
                    </div>
                    <!-- Space -->
                    <div class="art-element">
                        <h2 class="font-bold text-lg text-teal-600 mb-1" class="wiley-section-title">Space</h2>
                        <p class="text-gray-600 mb-2">The area around, between, or within elements of an artwork.</p>
                        <div class="h-10 bg-white flex items-center justify-center"><img src="https: //i.imgur.com/j5k2A7A.png" alt="Diagram illustrating positive and negative space concepts where positive space shows the main subject or object while negative space shows the empty areas around and between objects, demonstrating how both work together in artistic composition" class="h-8"></div>
                    </div>
                </div>
                 <div class="art-element mt-3 col-span-2 md: col-span-3">
                        <h2 class="font-bold text-lg text-gray-700 mb-1" class="wiley-section-title">Value</h2>
                        <p class="text-gray-600 mb-2 text-sm">The lightness or darkness of a colour. It helps create depth and form.</p>
                        <div class="h-10 bg-white flex items-center justify-center"><img src="https://i.imgur.com/8f4eY5B.png" alt="Grayscale value scale showing gradual progression from pure white through various shades of gray to deep black, demonstrating how value creates contrast, depth, and dimensional form in artwork" class="h-6"></div>
                    </div>
            </section>

            <!-- Art Detective Section -->
            <section class="mb-4">
                <h2 class="text-2xl font-bold text-gray-800 text-center mb-3 border-t-2 border-gray-200 pt-4" class="wiley-section-title">Art Detective 🎨</h2>
                <p class="text-center text-gray-600 text-sm mb-3">Look at the artwork below. Identify three elements of art that the artist has used and explain how they used them.</p>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-center mb-3">
                    <img src="https: //i.imgur.com/vjFbf3C.jpg" alt="Vincent van Gogh's famous painting 'The Starry Night' showing a swirling night sky with bright stars over a village with a prominent cypress tree in the foreground. The painting demonstrates multiple elements of art including curved and flowing lines in the sky, organic and geometric shapes in the buildings and landscape, vibrant colors of blue, yellow, and green, varied textures through thick brushstrokes, and strong value contrast between the dark foreground and bright sky" class="h-48 border-2 border-white">
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center">
                        <p class="font-semibold w-24">Element 1: </p>
                        
                    </div>
                    <div class="flex items-center">
                        <p class="font-semibold w-24">How it's used:</p>
                        
                    </div>
                     <div class="flex items-center pt-2">
                        <p class="font-semibold w-24">Element 2:</p>
                        
                    </div>
                    <div class="flex items-center">
                        <p class="font-semibold w-24">How it's used:</p>
                        
                    </div>
                     <div class="flex items-center pt-2">
                        <p class="font-semibold w-24">Element 3:</p>
                        
                    </div>
                    <div class="flex items-center">
                        <p class="font-semibold w-24">How it's used:</p>
                        
                    </div>
                </div>
            </section>

            <!-- Mini-Masterpiece Section -->
            <section>
                <h2 class="text-2xl font-bold text-gray-800 text-center mb-3 border-t-2 border-gray-200 pt-4" class="wiley-section-title">Your Mini-Masterpiece</h2>
                <p class="text-center text-gray-600 text-sm mb-3">In the box below, create a small drawing that focuses on using <strong class="font-semibold">line</strong>, <strong class="font-semibold">shape</strong>, and <strong class="font-semibold">texture</strong>.</p>
                
            </section>

            <!-- Curriculum Alignment Section -->
            <section class="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                <h2 class="text-lg font-bold text-purple-800 mb-3 text-center" class="wiley-section-title">📚 NZ Curriculum Alignment</h2>
                <div class="grid md: grid-cols-2 gap-4 text-sm">
                    <div class="bg-white p-3 rounded-lg border border-purple-100">
                        <h3 class="font-semibold text-purple-700 mb-2">The Arts - Visual Arts</h3>
                        <p class="text-purple-600 mb-1"><strong>Achievement Objective:</strong> VA4-1</p>
                        <p class="text-gray-700 text-xs">Use the elements and principles of visual art to create works</p>
                    </div>
                    <div class="bg-white p-3 rounded-lg border border-pink-100">
                        <h3 class="font-semibold text-pink-700 mb-2">Key Competencies</h3>
                        <ul class="text-pink-600 text-xs space-y-1">
                            <li>• Using language symbols and texts (visual)</li>
                            <li>• Thinking creatively in visual arts</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3 text-center">
                    <a href="curriculum-alignment.html" class="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                        📋 View Full Curriculum Framework
                    </a>
                </div>
            </section>
        ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default ElementsOfArtHandout
