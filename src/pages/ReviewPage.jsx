import { React } from 'react'
import ReviewDisplay from '../components/review/Review'
import Navbar from '../components/navbar/Navbar'
import { MobileContextProvider } from '../components/mobile-context/MobileContext'

function ReviewPage() {
    
    return (
        <div>
            <MobileContextProvider>
                <Navbar />
                <ReviewDisplay />
            </MobileContextProvider>
        </div>
    )
}

export default ReviewPage