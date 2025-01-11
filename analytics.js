document.addEventListener('DOMContentLoaded', function() {
    // Fetch analytics data from localStorage
    const analyticsData = JSON.parse(localStorage.getItem('resumeAnalytics')) || {
        totalEdits: 0,
        sectionUsage: {},
        totalTimeSpent: 0
    };

    // Update the dashboard with the fetched data
    document.getElementById('total-edits').textContent = analyticsData.totalEdits;

    // Determine the most used input fields
    const mostUsedInputFields = Object.keys(analyticsData.sectionUsage).reduce((a, b) => analyticsData.sectionUsage[a] > analyticsData.sectionUsage[b] ? a : b, 'N/A');
    document.getElementById('most-used-input-fields').textContent = mostUsedInputFields;

    // Update total time spent
    document.getElementById('total-time-spent').textContent = analyticsData.totalTimeSpent;

    // Add event listener to download report button
    document.getElementById('download-report-btn').addEventListener('click', downloadAnalyticsReport);
});

// Function to generate and download analytics report
function downloadAnalyticsReport() {
    const analyticsData = JSON.parse(localStorage.getItem('resumeAnalytics')) || {};
    const reportContent = `
        Total Edits: ${analyticsData.totalEdits}
        Total Time Spent: ${analyticsData.totalTimeSpent} seconds
        Section Usage: ${JSON.stringify(analyticsData.sectionUsage, null, 2)}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics_report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}