Rick and Morty Character List Application
This application fetches and displays a list of Rick and Morty characters using the Rick and Morty GraphQL API. It is built with Apollo Client and styled for readability. Users can filter characters, sort columns, paginate through results, and toggle the language between English and German (currently under development).

Features
Character Information Display:
Shows the following details for each character:
    1.Name
    2.Status (formatted as Alive, Dead, or Unknown)
    3.Species
    4.Gender
    5.Origin

Filter Options:

Filter characters by status (Alive, Dead, Unknown).
Filter characters by species.

Sorting Options:

Sort characters alphabetically by Name or Origin.

Pagination: Navigate through multiple pages of results.

Infinite scrolling implemented.

Language Switcher: Toggle between English and German for the column headers (in progress).

Responsive UI: Designed for readability using.


Installation and Setup
1.Clone this repository
2.Navigate to the project folder
3.Install dependencies:
    npm install
4.Start the development server
    npm run dev
5.Open your browser and visit:
    http://localhost:3000
    


Usage
Use the search bar and dropdown menus to filter by species or status.
Click on column headers to sort by Name or Origin.
Use the pagination controls at the bottom to browse through pages of results.
Switch between English and German using the language dropdown in the footer (currently in progress).


Technologies Used
HTML with Apollo Client for GraphQL queries
Rick and Morty GraphQL API
CSS for styling

