# Crime Investigation Agency (CIA) - Project Proposal
## Introduction
Our team is the Crime Investigation Agency (CIA). Looking at data from law enforcement agencies across the United States, we would like to delve deeper into hate crimes and incidents from 2010 to 2018, and study the spatial distribution of crimes as well as the relationships between variables such as the target groups (e.g. Anti-Asian) and the severity of such crimes.

## About Us

| Keona Mae Pablo | Audrey Tey | Evelyn Hu | Laura Lu |
| --- | --- | --- | --- |
| <img src="https://github.com/evelyn-s-hu/DH151-CIA/blob/main/images/KeonaMae.png?raw=true" width="350"> | <img src="https://github.com/evelyn-s-hu/DH151-CIA/blob/main/images/AudreyTey.jpg?raw=true" width="350"> | <img src="https://github.com/evelyn-s-hu/DH151-CIA/blob/main/images/EvelynHu.jpg?raw=true" width="350"> | <img src="https://github.com/evelyn-s-hu/DH151-CIA/blob/main/images/LauraLu.jpg?raw=true" width="350"> |
| Project Manager | Data Specialist | Content Developer | Webmaster |
| Keona Mae is a 4th year Cognitive Science major with a specialization in computing and minor in Digital Humanities. As an Asian American woman, the rise of Asian American hate crimes through the pandemic shocked her. Through this project she hopes to bring to light many of the struggles minorities face across the country and investigate ways we can create an inclusive environment for all people. | Audrey is a third-year Sociology and Statistics student, minoring in Digital Humanities. Through the project, she would like to find out more about the spatial distribution of hate crime in America, and investigate if there are any trends or explanations for such discrimination and persecution. | Evelyn is a fourth year Cognitive Science major specializing in Computing. After taking a course about the Asian American Movement last quarter, and as an Asian American herself, she was inspired to conduct further research into the struggles faced by Asian Americans during a time of heightened hate during the pandemic. | Laura is a second year Computer Science major. Being an Asian American herself, this topic hits close to home. With the rise of Asian American hate crimes committed during this last year as a result of the pandemic, she is especially interested in bringing more awareness to both the struggles the AAPI community is facing and their strength in light of it all. | 

## Overview
According to the FBI annual hate crime statistics report, hate crime reports are at an all time high in the last 12 years. Hate crimes targeting Black people have almost doubled since 2008 while Asian hate crimes have been on the rise during the COVID-19 pandemic. We, investigators in the CIA, are fighting for greater awareness regarding hate crime in the US and for equitable treatment and support for all individuals - regardless of their race, religion and sexual orietnation. Hate crimes alone have the power to overwhelm the lives of its victims. But there are rippling psychological and emotional effects into the communities that these hate crimes are targeting. While we understand that many hate crimes are underreported, our project is focused on diving deeper into existing data. Specifically, we want to show that there is an unequal spread of hate crime motivations and investigate potential correlations between the target group, volume and severity of the hate crimes committed.
 
## Methodology
Web mapping is an effective tool that allows us to display spatial and geographical information. It is a method of inquiry that can be used to support an overarching narrative on a specific topic or issue. 

Given that trends of hate crimes and incidents are very much tied to spatial information and the demographics of an area, web mapping would be an essential tool in helping us visualize and understand those trends. 

We plan to create two maps. The first map will show the total number of hate crimes in each American city. The data will be represented by a point marker on the city, whose radius corresponds to the total number of hate crimes. There would be a slider at the bottom of the map that allows users to select the year (2010 to 2018) for which to display the data. The second map will feature multiple layers, each layer of data being a specific dimension of hate crimes. For instance, anti-race hate crimes, anti-religion and anti-sexual orientation hate crimes would be individual layers. Again, the data would be represented by a point marker on the city, and the breakdown of crimes by target groups would appear in a pop-up.

## Workflow
  
| Milestone | Tasks to Complete |
| --- | --- |
| Week 2 | Create project proposal <br> Identify potential data sets |
| Week 3 | Finalize data sets <br> Clean and refine data |
| Week 4 | Begin UX design and create storyboards |
| Week 5 | Design website and create maps |
| Week 6 | Continue working on website and maps <br> Midterm presentation |
| Weeks 7-8 | Finish maps <br> Begin writing narratives |
| Week 9 | Incorporate temporal data through a map slider |
| Week 10 | Finalize website, map and elements |
| Finals Week | Present completed project |

## Technical Scope
Our project will utilize the following technologies:  
- Git for collaboration and to share our work with one another  
- Leaflet (or Tableau) for its web-mapping applications  
- HTML, CSS and Javascript to design and present our final product on a website  

## Geographic Scope 
Our project will focus on city-level data in America, mapping out hate crimes in 3,294 unique cities from 2010 to 2018.  

## Data
There are two main datasets that we intend to use on our project. They are the United States Hate Crimes (1991-2018) <a href="https://www.kaggle.com/datasets/louissebye/united-states-hate-crimes-19912017">Dataset</a> that we found on Kaggle, and the US Cities <a href="https://simplemaps.com/data/us-cities">Database</a> found on SimpleMaps.  

The first dataset consists of all the hate crimes between 1991 and 2018, as reported by authorities at the state, city, county levels, and other entities such as college campuses and tribal officials. We will first filter the data in two ways: (a) extract entries of hate crime that occured between the years of 2010-2018, (b) filter those entries to hate crimes reported at the city-level only. We will then clean the data and remove unwanted variables, leaving the following: year of hate crime, state, city, offender’s race, bias/motivations (e.g. anti-Asian), and the severity or type of offense (e.g. aggravated assault). 

The second dataset contains the coordinates and populations of all the cities in America. An inner join was performed to combine the first dataset with the coordinates and population variables from the second dataset. From the analysis of the ‘cities’ from the first dataset that did not have corresponding rows in the second dataset, we found that they are mostly rural villages and townships, or college campuses that were coded wrongly. As such, we have decided that it is appropriate to remove those entries from the dataset altogether.  

Using the newly combined dataset, we intend to display the number of hate crimes in each city as a proportional symbol map of the US, where the number of hate crimes in each city is represented by a circle and the radius of the circle corresponds with the number. Under the map, there would be a slider for the user to denote the time frame for the map. The slider would come with two buttons to change the start and end years intended for the data on the map. The color of the circle could represent the marginalized group that fell victim to the highest number of hate crimes in each city.  

There would be buttons that allow users to toggle two other variables: hate crime motivations (e.g. anti-Asian or anti-LGBTQ) and severity or type of offense. For each type of variable, there would be separate layers which can be toggled on and off. There would either be a checkbox or buttons which would allow users to choose multiple options for each variable and the filtered data would appear on the map accordingly. However, both variables cannot be displayed at the same time. Only either one can be filtered and displayed at any time. 

## UX Components: Storyboards
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F0EZrYGQCEaDJ6Jb5K1zjj9%2FDh151-CIA%3Fnode-id%3D0%253A1" allowfullscreen></iframe>
