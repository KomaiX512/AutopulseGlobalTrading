import React, { useContext, useEffect } from 'react';
import { HomeContext } from '../context/HomeContext';
import SolutionsByProject from '../Components/SolutionsByProject';

function SolutionsPage() {
    const { methods } = useContext(HomeContext);

    useEffect(() => {
        methods.loadSolutions();
    }, []);

    // Reuse component for full solutions list
    return (
        <div className="pt-4">
            <SolutionsByProject showExploreButton={false} />
        </div>
    );
}

export default SolutionsPage; 