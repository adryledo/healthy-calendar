### [ ] 1. Component Refactoring

- **Task:** Decompose the main `HealthyCalendar` component into smaller, reusable components.
  - Create `components/MonthlyGrid.tsx`, `components/WeeklySelector.tsx`, and `components/EventList.tsx`.
  - Migrate the relevant JSX, logic, and styles for each feature into its respective component file or styles folder.
  - Update the main screen to import and render these new components, passing state via props.
  - Relocate the main calendar screen from `components/` to `app/(tabs)/` to align with the app's routing structure.

### [ ] 2. Core Calendar Logic

- **Task:** Implement a fully functional and accurate monthly calendar grid.
  - The `MonthlyGrid` must dynamically display the correct days for any given month and year.
  - The grid layout should start on Monday.
  - Days from the previous and next months should be rendered to fill empty cells in the grid, styled distinctively (e.g., grayed out).

### [ ] 3. Weekly Selector Enhancements

- **Task:** Implement horizontal scrolling for the `WeeklySelector`.
  - The view should be constrained to show only 7 days at a time.
  - Users must be able to scroll horizontally to navigate through the days of the month.

### [ ] 4. Layout and Positioning

- **Task:** Finalize the vertical layout and alignment of the main calendar components.
  - The `WeeklySelector` should be positioned directly below the `MonthlyGrid`.
  - The `EventList` should be positioned directly below the `WeeklySelector`.

### [ ] 5. Styling and Visual Consistency

- **Task:** Unify the styling between the monthly and weekly views.
  - The day numbers within the `WeeklySelector` cells must be horizontally centered.
  - The spacing (margin/padding) between day cells in the `WeeklySelector` must exactly match the spacing in the `MonthlyGrid`.

### [ ] 6. Advanced Scroll Animation

- **Task:** Implement a collapsible header effect for the `MonthlyGrid`.
  - When the user scrolls up on the event list, the `MonthlyGrid` should smoothly scroll out of view.
  - The `WeeklySelector` should lock to the top of the screen as the grid collapses.
  - When at the top, scrolling down should cause the `MonthlyGrid` to reappear.
