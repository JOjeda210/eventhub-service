
export const socialService = {
    generateShareUrl: (platform, eventData) => {
        if(!eventData || !eventData.eventUrl){
            throw new Error('event data and eventUrl are required'); 
        }

        switch (platform) {
            case 'facebook':

                return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventData.eventUrl)}`

            case 'twitter':
                if(!eventData.title){
                    throw new Error('title is required');
                }
                return `https://twitter.com/intent/tweet?text=${encodeURIComponent(eventData.title)}&url=${encodeURIComponent(eventData.eventUrl)}`

            default:
                throw new Error("Platform not supported");
        }

    }
}