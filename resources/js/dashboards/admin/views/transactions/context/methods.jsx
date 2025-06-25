import axios from 'axios';

export async function loadTransactions({ setTransactions, search, cardType, dates, price, sortOrder, page }) {
    try {

        
        const queryParams = { page };

        if (search) {
            queryParams.search = search;
        }
        if (cardType) {
            queryParams.card_type = cardType;
        }
        if (dates && dates.length === 2) {
            queryParams.from_date = dates[0].toISOString();
            queryParams.to_date = dates[1].toISOString();
        } else if (dates && dates.length === 1) {
            queryParams.from_date = dates[0].toISOString();
        }
        if (price) {
            queryParams.price = price;
        }
        if (sortOrder) {
            queryParams.sort_order = sortOrder;
        }

        const response = await axios.get('/api/get/transactions', { params: queryParams });

        if (response?.data?.success) {
            setTransactions(response.data.data);
        }
        else {
            setTransactions([])
        }

    } catch (error) {
        console.error('Error:', error);
        setTransactions([])

    }
}
