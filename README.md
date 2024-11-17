# Charity Minutes

A project that allows for charity minutes to be taken according to UK charity law. 
It allows attendance, resolution votes (calculating quorum automatically) and text minutes to be create in a meeting, modified afterwards and exported.

![Image of the edit minutes page](report\assets\apendix\frontend-screenshots\Minutes Edit - Overview.png "Image of the edit minutes page")

The project is written in PHP (using the [Laravel](https://laravel.com/) framework), [React](https://react.dev/) and [Typescript](https://www.typescriptlang.org/). 
The project was done as part of a [University of York](https://www.york.ac.uk/) BEng Computer Science degree, and as such there is a project report that goes along side this repo. The abstract of the report can be found below, along with copies of the LaTeX.

## Design

The app is split in to two, a React front end written in Typescript and a PHP backend (and object model) which uses Laravel. This structure can be seen in the image below.

![Archtectural Design of the project](report\assets\methodology-assets\Methodology - Flow Diagram v2.drawio.png "Archtectural Design of the project")

## Development & Tests

First you will need to install all composer modules.

Laravel Artisan can be used to run the project in development.

There are unit tests that are run as part of the project. These are run as part of the CICD pipeline. Any new features should also contain new ones. 

##  Project Report

The full dissertation report can be found in LaTeX format in [report/Project Report.tex](report/Project-Report.tex).

### Abstract

> There are over 168,033 charities in the UK, which are overseen by the Charity Commission. 
A charity is run by trustees who are responsible for ensuring that it follows governmental and regulatory compliance regulations. To aid the trustees in making good decisions, every charity must have a governing document describing how it should be run. 
In cases where the trustees fail to comply with regulations, the Charity Commission opens an investigation in which they inspect the minutes of trustee meetings to help them understand their decision making process. 
This shows that the minutes of any trustee meetings are paramount in proving a that a charity is compliant with the law. 
Therefore a tool that models a charity as a discrete system and allows trustees to minute meetings while checking they are following the rules of the charity could be created. 

> A website makes the most sense for implementing this, because they can implement a Object Relational Map (ORM) model.
A ORM model is a way of modeling real world entities, there is a series of database tables and logical classes that contain the functions (and validation rules) to manipulate the database.
The website has two elements: a front end containing the user interface and a back end containing the model (in the ORM format) for the charity, along with the checks to ensure compliance.
A series of existing web frameworks have been written to support website development and the best options for this project were Laravel (written in PHP) for the back end and React (written in Javascript) for the front end.

> In implementing the website, it was necessary to select a specific governing document to analyse and tailor the tool, for an example governing document provided by the charity commission for a Charitable Incorporated Organisation.
The first implementation step was to create the database structure. For this, Maria DB was used as it provided the best performance.
After this the charity model was created within Laravel, after which the API routes were designed and a way of storing meeting attendance implemented.
Within the API routes is also where the compliance checking takes place. Finally a front end user interface was created that consumed the API.
This used various other modules to support the React framework in creating pages and data handling. 

> To validate that the model was created correctly and that the front end behaves as expected a series of both unit tests and manual tests were created.
These were primarily based around a series of requirements that had been written before the website had been implemented.
In total 20 unit tests were written (achieving a code coverage of 81.82%) and 16 manual tests were written and run.
Due to time constraints it was not possible to complete all of the requirements that were created, however the vast majority were implemented to some degree.
This all showed that it was indeed possible to model a charity successfully and create an interface that allows the model to be manipulated. 

> For the most part the project went smoothly however there are some bits that require further work and investigation.
The biggest of these was that throughout this project no questionnaires or usability studies were conducted with charity trustees and members.
For this reason the project cannot categorically conclude that the tool that was created supports charities in the best possible way, however it has instead showed that a charity model could be created.

> None the less, the project was successful in achieving the aims it set out to.
