Rick and Morty Character List Application
This application fetches and displays a list of Rick and Morty characters using the Rick and Morty GraphQL API. It is built with Apollo Client and styled for readability. Users can filter characters, sort columns, paginate through results, and toggle the language between English and German (currently under development).

Features
Character Information Display: Shows the following details for each character:
Name
Status (formatted as Alive, Dead, or Unknown)
Species
Gender
Origin
Filter Options:
Filter characters by status (Alive, Dead, Unknown).
Filter characters by species.
Sorting Options:
Sort characters alphabetically by Name or Origin.
Pagination: Navigate through multiple pages of results.
Language Switcher: Toggle between English and German for the column headers (in progress).
Graceful Error Handling: Handles loading and error states with clear messages.
Responsive UI: Designed for readability using [CSS or a UI library].


Installation and Setup
Clone this repository:
Navigate to the project folder:
Install dependencies:
Start the development server
Open your browser and visit:


Usage
Use the search bar and dropdown menus to filter by species or status.
Click on column headers to sort by Name or Origin.
Use the pagination controls at the bottom to browse through pages of results.
Switch between English and German using the language dropdown in the footer (currently in progress).


Technologies Used
React with Apollo Client for GraphQL queries
Rick and Morty GraphQL API
CSS (or your chosen UI library) for styling

