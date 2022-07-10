# What are different branching strategies ?
  A BRANCHING STRATEGY AIMS TO:
    Enhance productivity by ensuring proper coordination among developers
    Enable parallel development
    Help organize a series of planned, structured releases
    Map a clear path when making changes to software through to production
    Maintain a bug-free code where developers can quickly fix issues and get these changes back to production without disrupting the development workflow
  
  Below are some strategies
    1) GitFlow
    2) GitHub Flow
    3) GitLab Flow
    4) Trunk-based development

# Solid principles

  SOLID stands for:

        S - Single-responsiblity Principle
        O - Open-closed Principle
        L - Liskov Substitution Principle
        I - Interface Segregation Principle
        D - Dependency Inversion Principle

   - Single-responsibility Principle (SRP) states:
        A class should have one and only one reason to change, meaning that a class should have only one job.  
   - Open-closed Principle (OCP) states:
        Objects or entities should be open for extension but closed for modification. 
   - Liskov Substitution Principle states:
        Let q(x) be a property provable about objects of x of type T. Then q(y) should be provable for objects y of type S where S is a subtype of T.    
        This means that every subclass or derived class should be substitutable for their base or parent class.  
   - Interface Segregation Principle
        A client should never be forced to implement an interface that it doesn’t use, or clients shouldn’t be forced to depend on methods they do not use.
   - Dependency inversion principle states:
        Entities must depend on abstractions, not on concretions. It states that the high-level module must not depend on the low-level module, but they should depend on abstractions.

# OOPS

  OOP – Object-Oriented Programming Principle is the strategy or style of developing applications based on objects.

  Anything in the world can be defined as an object. And in the OOPs, it can be defined in terms of its properties and behavior. 

  Object-Oriented Programming Principles is the most popular amongst others because it  relates to real-life objects. Every operation that is going to be functional is  considered in terms of classes and objects. That provides a better programming style because you need not write code that needs to run anytime. Instead, you can create classes defining the functionality and call that function by creating an object of that. 

  Object-oriented Programming has mainly 4 components –  Objects,Classes,Methods,Instances

  Principles of Object-Oriented Programming

  Object-Oriented Principles mainly include the 4 pillars that together make the OOP a very powerful concept. That is – 

  - Abstraction
      Abstraction can be defined as hiding internal implementation and showing only the required features or set of services that are offered. This is the most essential part of Object-Oriented programming.

      Features of Abstraction – 

        1) Security- 
              With Abstraction, the Outside persons don’t know the internal implementation so it makes the classes more secure, so the unauthorized user will not have access to the data.
        2) Easy Enhancement- 
              Suppose in the future we want to change the logic of the implementation in class, So we don’t have to change the entire external logic which is there for the user. Just we need to make changes for the methods and it will not affect the functionality.
        3) Improves Easiness- 
              It helps to use the features without knowing implementation so it improves easiness for the users to use that.
        4) Maintainability will improve- 
             Without affecting the user, it can able to perform any types of changes internally. SO maintainability will improve.

  - Encapsulation
       Encapsulation can be defined as the binding of data and attributes or methods and data members in a single unit. In classes, we have Data and attributes that perform operations on that data. So  according to the OOPs principle of Encapsulation, that data can be merged into a single unit. Encapsulation enhances more security of the data as everything related to a single task must be grouped and access to the data is given as per need.

      And this can be achieved using the concept of Data Hiding.

      Encapsulation  =  Data Hiding + Abstraction.

      Data Hiding – It means hiding the data of the class and restricting access to the outside world. Example – Using the access specifier keywords like private that restricts the data to only accessible and modifiable in the same class. Outside users can not access the data.

      Features of Encapsulation – 

      - It provides extra security by the concept of Data Hiding. 
      - It groups the data and operation in that data into a single unit.
      - It attaches an extra security layer to the data and allows to access data only to authorized ones.

  - Inheritance
      Inheritance is the method of acquiring features of the existing class into the new class. Suppose there is a class, considered as the parent class, that has some methods associated with it. And we declare a new class, considered as the child class, that has its own methods. So, when a child class is inherited from the parent class then it will have all the methods associated with parent class are available in the child class along with the child class own methods also. So that is Inheritance.

      Inheritance has multiple types that depend on programming languages implementation. Some of the common types of inheritance are- 

      Single Inheritance – When there is only one derived class.
      Multiple Inheritance – When child class is inheriting more than one base class.
      Multilevel Inheritance – When there is a level of inheritance. From class A to class B to class C.
      Hierarchical Inheritance – When more than one derived class is inheriting one base class.

  - Polymorphism

      Polymorphism is the most essential concept of the Object-Oriented Programming principle. It has meaning ‘poly’ – many, ‘morph’ – forms.  So polymorphism means many forms. 

      In Object-Oriented Programming, any object or method has more than one name associated with it. That is nothing but polymorphism.

      For Objects – When any object can hold the reference of its parent object then it is a polymorphism. 

# OOPS in JS?
    https://www.geeksforgeeks.org/introduction-object-oriented-programming-javascript/

#

  *** Resources ***

  - https://www.flagship.io/git-branching-strategies/
  - https://medium.com/@patrickporto/4-branching-workflows-for-git-30d0aaee7bf
  - https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design
  - https://www.interviewbit.com/blog/principles-of-oops/
