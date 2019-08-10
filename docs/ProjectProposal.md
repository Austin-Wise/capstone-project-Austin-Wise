# Ticker Tape
1. [Application Definition Statement](#one)
2. [Target Market](#two)\
2.1 [Analysis of Complementary Product](#two_one)\
2.2 [Demographic Study](#two_two)\
2.3 [Target Summary](#two_three)
3. [Personas](#three)\
3.1 [The Investing Newbie](#three_one)\
3.2 [The Fearlessly Frugal](#three_two)
4. [Use Cases](#four)
5. [Problem Statement](#five)
6. [Pain Points](#six)
7. [Solution Statement](#seven)
8. [Competition](#eight)
9. [Key Features](#nine)
10. [Integrations](#ten)\
10.1  [Intrinio](#ten_one)\
10.2  [Watson Discovery](#ten_two)\
10.3  [Google Natural Language](#ten_three)


## <a name="one"></a>1. Application Definition Statement

Ticker Tape is a news feed application intended for part-time investors seeking real-time updates on companies within their portfolio. Current RSS feeds provide information on topics which may align with user preference, though they are rarely geared toward an individual's position within a company. The unique value proposition of Ticker Tape combines sentiment analysis, filtration on current holdings, and (as an extended goal) push notifications to keep the investor informed.

## <a name="two"></a>2. Target Market

### <a name="two_one"></a>2.1 Analysis of Complementary Product
Robinhood, a popular commission-free trading app amongst Gen-Y and Z users - average age of 32, has a user base now surpassing E-Trade (Reddy, 2019). This mobile-friendly, commission-free method of investing focuses less on tooling and more on ease-of-use.

### <a name="two_two"></a>2.2 Demographic Study

*~30% of American adults have non-retirement investment accounts.*

According to a 2018 NFCS FinTech-related study:
>"Younger respondents, those with higher incomes, and non-White respondents are more likely to use technology to help with personal financial management."

Primary factors for this analysis contain two categories: Use of websites/apps for financial tasks, Spending less than Income. Financial Well-Being scores are seen as a secondary factor.

#### Websites / App use for financial tasks

##### Age
    - 56% between 18 and 34
    - 42% between 35 and 54
    - 23% among 55+
##### Ethnicity
    - 51% African American
    - 49% Hispanic
    - 34% White
    - 45% Asian American
    - 41% Other

#### Spending Less than Income
##### By Education Level
    - 36% HS or Less
    - 38% Some College
    - 50% College or More

##### By Ethnicity (2018)
    - 34% African American
    - 39% Hispanic
    - 42% White
    - 46% Asian American

#### Financial Well-Being Score
(Financial Well-Being score is correlated with overall satisfaction with personal finances, and inversely correlated with financial difficulty)

##### By Age
    - 48%  18-34
    - 49%  35-54
    - 59%  55+

##### By Income
    - 44%  <$25k
    - 51%  $25-75k
    - 59%  $75k+
#### Employment Sector

The  [Journal of Behavioral and Experimental Economics](https://www.sciencedirect.com/science/journal/22148043 "Go to Journal of Behavioral and Experimental Economics on ScienceDirect"), [Volume 74](https://www.sciencedirect.com/science/journal/22148043/74/supp/C "Go to table of contents for this volume/issue"),  argues that a correlation can be made between mathematics anxiety and financial anxiety, when considering an individual's ability to attain financial literacy. This idea is further exemplified by the "NPR Ted Radio Hour: Don't Fear Math" guest - Phylecia Jones, who states that [individuals] that have a better relationship with math tend to handle their finances with more success. 

A connection can be made that individuals working with mathematics - as such in STEM career fields, have heightened financial literacy and therefore, are more likely to find value in this application. Features of the application such as sentiment analysis may allow these individuals approaching investing systematically may have advantage over widespread trends of investor fear or greed.

#### Hobbies

[Business Insider - Hobbies of 12 ultra-successful entrepreneurs]

### <a name="two_three"></a>2.3 Target Summary
As Ticker Tape will be seen as a complementary product to services such as Robinhood, the mean age will be a contributing factor to Ticker Tape's target age.

Additional findings cited from the 2018 National Financial Capital Study suggest Hispanic and Asian American individuals between as target ethnicities, as they not only spend less than income, but are also most likely to use websites and applications for financial tasks. 

In terms of age group and education level, Ticker Tape will be marketed towards college educated individuals between 21 and 34, where focus is skewed left.

Target income follows loosely towards $25-75k, as the financial well-being score naturally progresses as income increases. For employment sector, individuals within the science, technology, engineering, or mathematics fields are seen as primary candidates for the application, however secondary may fall to individuals within the business or logistics sectors.

Individuals with African American and White ethnicity, as well as  individuals between 25 and 54 follow as Secondary markets, as their scores are satisfactory in terms of "Website / Application use for financial purposes" **or** "Spending Less than Income". Though individuals above 55 have satisfactory scores for financial well-being, this age group scores very poorly within the "Website / Application Use" criteria and is not considered as a secondary market.

## <a name="three"></a>3. Personas

### <a name="three_one"></a>3.1 Jimmy Woo  *#investingnoobie*
> **Location:** Portland, OR
> 
> **Age:** 28\
> **Ethnicity:** Asian American\
> **Pronouns:** He / Him / His\
> **Household-Size:** 3
> 
> **Profession:** Cyber Security Analyst\
> **Income:** $54k\
> **Portfolio:** $7k\
> **Broker:** Robinhood
> 
> **Goals:**
> - Start education fund for child
> - Gain better understand trends and reversals
> - Find quality news publications related to investments
>
> **Frustrations:**
> * Unable to identify market reversals
> * Hard time finding beneficial news outlets
> * Needs time for family-life
> 
> **Bio:** Jimmy is new to parenthood and understands the importance of investing early for his child's education. This recent decision has led to overly-eager trading mistakes - resulting in a net loss. Since then, he has decided to pull his funds, as he realized he wasn't up to date on the companies he had invested in. Though he understands he needs to study further before re-entering the market. Being a family-man with a full-time job, he can only dedicate an hour a day to this new income stream.
> 
> **Investment Goal:** Consistently yield higher ROI than Certificate of Deposit.
>  
> |Technology Confidence|   |
> |--|--|
> | IT and Internet | ••••• |
> | Software | •••• |
> | Mobile Apps | •• |
> | Social Networks| • |
>
>**Hobbies:** Tennis, Cooking, Golf, Rowing

### <a name="three_two"></a>3.2 Miriam Martìnez *#fearlesslyfrugal*
> **Location:** Houston, TX
> 
>  **Age:** 32
> **Ethnicity:** Hispanic
> **Pronouns:** She / Her / Hers
> **Household-Size:** 1
> 
> **Profession:** Petrochemical Engineer
> **Income:** $83k
> **Portfolio:** $71k
> **Broker:** T.D. Ameritrade
> 
> **Goals:** 
> * Maintain awareness on investment health
> * Ability to research potential investments quickly
> * Find platform with focus on business news without distractions
>
> **Frustrations:**
> * Difficult to manage time needed for proper market research
> * Fear of missing important company-related news updates
> * Too many steps between checking portfolio and news
> 
> **Bio:** Miriam has been putting away a portion of her salary since college. She has taken courses on personal-finance and investment strategies over the years. Although she works 50+ hours weekly, she tries to find time at home to manage her portfolio, keeping updated on company news throughout the day during her free time. She is currently a subscriber to Investors Business Daily and the Wall Street Journal, however feels she doesn't have the time to comb through articles for pertinent information. Her greatest complaint with her current broker is ease-of-use, requiring too many steps between her portfolio and the news. 
> 
> **Investment Goal:** Financial Freedom by 45
> 
> |Technology Confidence|   |
> |--|--|
> | IT and Internet | •••• |
> | Software | • |
> | Mobile Apps | ••• |
> | Social Networks| •• |
> 
> **Hobbies:** Spinning, Running, Book Club

## <a name="four"></a>4. Use Cases

### <a name="four_one"></a>USER STORY 1: Diverse Channels
As Jimmy Woo, I want to see articles from a diverse set of news agencies to better draw *my own* conclusions.
**Acceptable Criteria:**
* Customer can select relevant Company *(aka Ticker Feeds)*
* Customer can sort saved Ticker Feeds.
* Customer can filter news agencies and blog sites.
* Customer can select news time-frame.
*  (Extended Goal): Articles reload in 5-min intervals.

### <a name="four_two"></a>USER STORY 1: Article Analysis
As Jimmy Woo, I want to understand the tone of recent articles quickly to prepare for changes in the market.
**Acceptable Criteria:**
* Customer can view the mean sentiment analysis of all articles regarding company shares via the _category_ section of the website.
* Customer can view the article sentiment analysis on -1 to 1 scale via the _newsfeed_ section of the website.
* (Extended Goal): News updates are implemented to desktop via Push Notification.

### USER STORY 3: <a name="four_three"></a>Navigability
As Miriam Martìnez, I want to minimize steps between share value, graph data, and news.
**Acceptable Criteria:**
* Customer can view share price of all saved Ticker Feeds at all times within primary portions of the application.
* Customer can view mean sentiment analysis of all articles regarding company shares at all times within primary portions of the application.
* Customer can view company-specific information such as the traded stock exchange, CEO name, and company description within a subset of the _newsfeed_ view.

### <a name="four_four"></a>USER STORY 4: Bookmarks
As Miriam Martìnez, I want to save articles that interest me for future reading.
**Acceptable Criteria:**
* Customer can save link to articles while navigating the _newsfeed_ section.
* Saved articles are time-stamped for better accessibility and filtering methods.
* Customer can remove saved article links from personal _bookmark_ section



## <a name="five"></a>5. Problem Statement

As the 2018 Pew Survey revealed, half of respondents who prefer to get their news from social media outlets believe the reporting is "largely inaccurate". This is only surprising when considering 21% of them continue - for the sake of "convenience" (Pullen, 2019). As consumers prefer a convenient place to find current events, social media outlets often operate as a double-edged sword. Popular platforms such as Facebook customize content to better align with what is already within the consumer's "circle of information", allowing one bad apple to the pie (Fiusm, 2017). This presents the first issue with existing platforms - consumers must decide between convenience and accuracy.

Where financial news is regularly found, the brokerage website, the environment is slightly different. Though it is a single destination for most of the user's needs, it is often difficult to navigate without assistance from an agent. Most members feel overwhelmed when attempting to find tools and navigate the platform (Batchu, 2019). This can be argued further by a 2018 Measuring U survey, where 199 participants were asked User Interface related questions regarding the following banking sites:
 -   Charles Schwab (schwab.com)
-   E*Trade (us.etrade.com)
-   Fidelity Investments (fidelity.com)
-   Merrill Lynch (ml.com)
-   TD Ameritrade (tdameritrade.com)
-   Vanguard (investor.vanguard.com)

The study found that many of these sites had a steep learning curve, disorganized product pages, and generally marginal usability (Sauro, 2018). To address potential financial anxiety, unevenness and sporadic design language should be minimized (Kreger, 2019). The culmination of these studies highlight a range of issues with current methods regarding the delivery of current events. As consumers will follow the path of least resistance, their portal for financial news should not be difficult to navigate nor should their opinions be manipulated by social media goliaths. 

## <a name="six"></a>6. Pain Points

* Users feel obligated to use deceptive media outlets to consume information regarding current events.
* Existing financial platforms are difficult to navigate.
* Brokerage websites are often disorganized and inconsistent in design.
* New investors quickly realize a steep learning curve in terms of navigability and jargon with existing platforms.
* News platforms are often biased and diversity is often difficult due to social media algorithms. 

## <a name="seven"></a>7. Solution Statement

*How is your project going to solve the problem outlined above? Consider the competing products in your market space. What makes your solution different from other’s attempts to solve the problem? How are you able to better solve the defined problem for your audience than your competition?*

## <a name="eight"></a>8. Competition

*What competing products exist to solve this or a similar problem? Identify and summarize competing products and how their approach to solving your identified problem differ from your own.*

## <a name="nine"></a>9. Key Features

*Define key features intended to provide solutions to specific problems and pain points you have identified. These key features should be specifically defined in response to problems / pain points. More generic features like User Authentication should not be defined here.*

## <a name="ten"></a>10. Integrations

*Identify what 3rd party APIs, data sets, or external integrations are planned for use and outline how you will use them transformatively. Provide links to their respective documentation and verify that your intended use complies with their Terms of Service.*

### <a name="ten_one"></a>10.1 Intrinio
### <a name="ten_two"></a>10.2 Watson Discovery News
### <a name="ten_three"></a>10.3 Google Natural Language 
### <a name="ten_four"></a>10.4 Passport.js

## Works Cited

Batchu, Vamsi. “The Stock Trading Secrets to Help You Design for Finances - a UX Case Study.”  _Medium_, UX Collective, 21 Apr. 2019, uxdesign.cc/the-stock-trading-ux-case-study-secrets-to-help-you-design-for-finances-e7426c88ff82.

Fiusm Editorial. “Diversify Your News Sources to Avoid Heavy Biases from the Media.”  _Panther Now_, 14 Sept. 2017, panthernow.com/2017/09/14/diversify-your-news-sources-to-avoid-heavy-biases-from-the-media/.

Kreger, Alex, and UX Design Agency. “Seven UX Design Hacks to Make Your Banking Insanely Great.”  _The Financial Brand_, 2019, thefinancialbrand.com/81989/ux-design-hacks-digital-banking-customer-experience/.

Lin, Judy T, et al. “The 2018 National Financial Capability Study.”  _The State of U.S. Financial Capability_, www.usfinancialcapability.org/.

Pullen, John Patrick. “Reading the Mueller Report Is Easy. It's the News That People Can't Figure Out.”  _Fortune_, Fortune, 19 Apr. 2019, fortune.com/2019/04/18/read-the-mueller-report-news-literacy-social-media/.

Reddy, Arjun. “Robinhood, a Trading App Loved by Millennials, Is Reportedly Nearing Funding That Would Value It at over $7 Billion | Markets Insider.”  _Business Insider_, Business Insider, markets.businessinsider.com/news/stocks/robinhood-trading-app-nears-funding-7-billion-valuation-2019-5-1028230045.

Suaro, Jeff. “The UX of Brokerage Websites.”  _MeasuringU_, 6 Nov. 2018, measuringu.com/ux-brokerage/.

