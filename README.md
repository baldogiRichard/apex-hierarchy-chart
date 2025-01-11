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

![Képernyőkép 2025-01-11 214200](https://github.com/user-attachments/assets/de1fb3d1-82f3-47e1-8b9c-59ea9728dd9a)

<b>Column Mapping</b>

![Képernyőkép 2025-01-11 214612](https://github.com/user-attachments/assets/f8cbb8d4-9b8b-415f-8051-7eaf5a1a4b58)

![Képernyőkép 2025-01-11 215844](https://github.com/user-attachments/assets/9e719fd3-79b0-4221-ab3b-5824af7f67c7)

<p>Mandatory fields (ID Column, Parent ID Column, Node Level Column): Are used to determine the structure of the data.</p>
<p>Optional fields: Are a comma delimited (,) list of columns which is usually being used for the Node HTML Template and is meant to be replaced with the ${COLUMN_NAME} substitution notations.</p>

<b>HTML Templates</b>

<p>One template can be defined for the overall look of the given node and another can be defined for the Expand/Collapse button.</p>

![Képernyőkép 2025-01-11 215430](https://github.com/user-attachments/assets/3627bae2-4a11-48f1-bc0f-93d6bd51df41)

![Képernyőkép 2025-01-11 215605](https://github.com/user-attachments/assets/93165f91-1d50-47e2-87ec-5f6663cb1e69)

<p>Node Width/Height: Width and Height of the Node Template.</p>

<b>${} Notation</b>

<p>HTML templates are using a ${} notation and are case sensitive. So if the name of the column is defined in the source query in upper cases ${COLUMN_NAME} then the name of the column must be defined with upper case as well in the ${} notation.</p>

![Képernyőkép 2025-01-11 222600](https://github.com/user-attachments/assets/a645aebb-437b-4a53-9ec6-aa21906de4df)


# 
License MIT
