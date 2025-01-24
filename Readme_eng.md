# Weekly Event Generator

This is a Google Apps Script project that helps users automatically create recurring events in Google Calendar.

[English](./Readme_eng.md) | [繁體中文](./Readme.md)

## Support This Project

If you find this project helpful, you can buy me a coffee!

<a href="https://www.buymeacoffee.com/whoami885" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60" width="217">
</a>

## Features

- Automatically create recurring events in selected Google Calendar
- Support multiple rotating event names
- Automatically skip holidays (feature to be implemented)
- Events are created from Monday to Friday
- One-click deletion of all automatically created events

## How to Use

1. Create a new project in Google Apps Script
2. Copy the contents of `Code.gs` and `Index.html` to corresponding files
3. Deploy as a web application
4. Grant necessary calendar access permissions
5. Start using!

### Detailed Steps

1. Select the calendar to create events from the dropdown menu
2. Enter one or more event names
3. Click the "Create Events" button
4. The system will automatically create corresponding events for each working week in the coming year

## System Requirements

- Google Account
- Access permissions to Google Calendar

## Technical Details

- Developed using Google Apps Script
- Frontend uses native HTML, CSS, and JavaScript
- Backend uses Google Calendar API

## Notes

- Created events include the `[AutoEventCreator]` tag
- Delete function only removes events with this tag
- Events are created as all-day events from Monday to Friday

## License

This project is licensed under the MIT License - see the [LICENSE](./License.txt) file for details

