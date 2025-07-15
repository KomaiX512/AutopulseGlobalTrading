import React from 'react'
import HeroBanner from '../Components/HeroBanner'
import Introduction from '../Components/Introduction'
import MachinesByBodyType from '../Components/MachinesByBodyType'
import MachinesByBrand from '../Components/MachinesByBrand'
import SolutionsByProject from '../Components/SolutionsByProject'
import AttachmentsByCategory from '../Components/AttachmentsByCategory'
import ExploreAttachments from '../Components/ExploreAttachments'
import Latest from '../Components/Latest'
import ShipmentsShowcase from '../Components/ShipmentsShowcase'
import BlogPreview from '../Components/BlogPreview'
import Services from '../Components/Services'
import FAQ from '../Components/FAQ'
import Testimonials from './Testimonials'
import Contact from '../Components/Contact'
import WhatsAppButton from '../Components/WhatsAppButton'

function HomePage() {

    return (
        <div className="p-0 relative page-home">
            {/* Hero Section (dynamic) */}
            <HeroBanner />

            {/* Introduction Section */}
            <Introduction />

            {/* === HEAVY MACHINERY SECTIONS === */}
            {/* B. Heavy Machinery by Category - Grid of machine categories */}
            <MachinesByBodyType />
            
            {/* C. Heavy Machinery by Brand - Brand logos and links */}
            <MachinesByBrand />
            
            {/* D. Explore Heavy Machinery - Single row with navigation */}
            <Latest />
            
            {/* === ATTACHMENTS & ACCESSORIES SECTIONS === */}
            {/* E. Attachments & Accessories by Category - Grid of attachment categories */}
            <AttachmentsByCategory />
            
            {/* F. Explore Attachments & Accessories - Single row with navigation */}
            <ExploreAttachments />
            
            {/* G. Solutions by Industry/Project */}
            <SolutionsByProject />
            
            {/* Enhanced Services Section - Why Choose Us */}
            <Services />
            
            {/* H. Shipments Showcase - Recent deliveries carousel */}
            <ShipmentsShowcase />
            
            {/* I. Blog Preview Section - Latest articles */}
            <BlogPreview />
            
            {/* FAQ Section */}
            <FAQ />
            
            {/* Testimonials */}
            <Testimonials />
            
            {/* Contact Section */}
            <Contact />
            
            {/* Floating WhatsApp Button */}
            <WhatsAppButton />
        </div>
    )
}

export default HomePage
