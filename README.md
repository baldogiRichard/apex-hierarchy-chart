# apex-hierarchy-chart
This repository contains the files for the APEX Hierarchy Chart Plug-in.

Oracle Application Express - Hierarchy Chart Plugin

This plug-in helps to visualize data in a hierarchical view with flexible capabilities of displaying custom node content and rendering large and complex hierarchies with partial load behaviour.

Minimum requirement: Oracle Application Expresss 24.1

This plug-in uses the <a href="https://github.com/bumbeishvili/org-chart" rel="nofollow">Bumbeishvili org-chart</a> library.

# setup

You can check each setup in my downloadable <a href="https://github.com/baldogiRichard/plug-in-site" rel="nofollow">Sample Application: APEX Plug-ins by Richard Baldogi</a>

In order for this Plug-in to work properly the following attributes must be fullfilled:

<b>Settings</b>

![image](https://github.com/user-attachments/assets/0b90d9b7-3fe2-47ab-bcfc-65af0671d430)

<p>Partial Data Load: If the attribute is enabled then only a chunk of the source data will be fetched towards the browser. The number of fetched records is depending on the "Last Node Level to be Expanded" attribute. If the attribute is disabled then all data will be fetched in one run.</p>

<p>Last Node Level to be Expanded: A number which tells on one hand what is the last expanded level on the displayed region but on the hand it tells the defined level + 1 which will be fetched during rendering. So for example if the value is 2 then the last expanded (or displayed) level will be the 2nd level but records till the 3rd level will be fetched towards the user.</p>

<b>Column Mapping</b>

<b>HTML Templates</b>

# License MIT
