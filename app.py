from flask import Flask, render_template, abort

app = Flask(__name__)

# Resume data
resume_data = {
    'name': 'Mayank Dashore',
    'title': 'Data Engineer',
    'portrait_image': 'images/PF.jpg', # You can change this to any image path, e.g. 'images/my-photo.jpg'
    'contact': {
        'linkedin': 'linkedin.com/in/mayankaz'
    },
    'summary': 'Results-driven Data Engineer with 2 years of experience building scalable ETL and AWS-based data pipelines using Python and SSIS. M.Tech in Big Data Analytics with a research publication in the data domain. Strong background in data modeling, transformation, and BI solutions using SQL Server, SSAS, MySQL, and Power BI semantic models. Passionate about pipeline automation, data quality, and high-performance analytics delivery.',
    'education': [
        {
            'degree': 'Master of Technology in Computer Science Engineering with Specialization in Big Data Analytics',
            'institution': 'Vellore Institute of Technology, Vellore',
            'period': 'Aug 2023 - Jun 2025',
            'gpa': '8.75 / 10'
        },
        {
            'degree': 'Bachelor of Technology in Computer Science Engineering',
            'institution': 'Bhilai Institute of Technology, Bhilai',
            'period': 'Aug 2019 - Jun 2023',
            'gpa': '9.18/10'
        }
    ],
    'skills': {
        'proficient': ['Python (Pandas, Numpy, PySpark)', 'SQL (MySQL, SQL Server)', 'AWS (Lambda, Glue, S3, Athena, DynamoDB, Step Functions)', 'Power BI', 'Git'],
        'exposure': ['Airflow', 'Hadoop', 'Hive', 'HBase', 'SSIS']
    },
    'certifications': [
        'Snowflake – Build 2025 - 2026: Data Engineering Bootcamp',
        'Udemy – Microsoft Fabric - The Complete Guide',
        'Coursera – SQL for Data Science',
        'Udemy – Python Programming'
    ],
    'experience': [
        {
            'position': 'Junior Software Engineer',
            'company': 'SpurTree Technologies, Bengaluru, India',
            'period': 'Aug 2024 - present',
            'responsibilities': [
                'Built ETL pipelines using AWS Glue and SSIS to process batch financial data across 3M+ tables, reducing manual data preparation effort.',
                'Cleaned, validated, and transformed structured and semi-structured data from third-party finance APIs.',
                'Designed Power BI dashboards for finance and payroll reporting.',
                'Wrote and optimized SQL queries to support analytics and recurring reports which reduced report generation time by 40%.',
                'Automated recurring data workflows using AWS services.',
                'Designed a semantic model for a private equity company and helped generate reports.'
            ]
        },
        {
            'position': 'Data Analyst Intern',
            'company': 'Infosys (Springboard Program), Remote',
            'period': 'Apr 2024 - Jun 2024',
            'responsibilities': [
                'Developed a movie recommendation system using machine learning and Python.',
                'Built Power BI dashboards using SQL.',
                'Led the team of 12 to make a recommendation system and analyse the KPIs on a Power BI dashboard.'
            ]
        },
        {
            'position': 'Trainee',
            'company': 'Steel Authority of India Limited, Chandrapur',
            'period': 'Sep 2021 - Sep 2021',
            'responsibilities': [
                'Analyzed production and operation data based on ad hoc strategies.',
                'Cleaned, transformed and validated datasets using Excel and SQL.',
                'Developed Power BI reports to track the KPIs.'
            ]
        }
    ],
    'projects': [
        {
            # To add a custom cover image, add an 'image_url' key like below:
            # 'image_url': 'https://picsum.photos/seed/p1/800/600',
            'title': 'Investment Ledger processing for a Private Equity',
            'date': 'Feb 2026',
            'description': [
                'Developed and orchestrated a complex SSIS pipeline which processes over 3M+ tables from the database.',
                'Designed a snowflake schema financial model to map the ledgers to its dimensional attributes such as measuring units.',
                'Designed ad hoc sql queries on stakeholders request to fetch the data and designed a Power BI Dashboard.'
            ]
        },
        {
            'image_url': 'https://picsum.photos/seed/p2/800/600',
            'title': 'Financial Ranking system for Investment',
            'date': 'Sep 2025',
            'description': [
                'Built a batch processing data pipeline to gather data from 10+ different financial API into S3 as a data lake.',
                'Automated data processing in AWS environment to extract, transform and load the data reducing manual effort of calculation and reducing pipeline failure errors by effective logging.',
                'Provided ranking insights of funds on a monthly basis making it easier for portfolio managers to make strategies for investment.'
            ]
        },
        {
            'title': 'Interactive Financial Dashboard',
            'date': 'Jun 2025',
            'description': [
                'Developed a Power BI Dashboard for portfolio managers to understand the diversification in portfolio of a client and his family.',
                'Designed a financial model to segregate the mutual fund, stocks and bank accounts of a person and a family.',
                'Implemented strategies relating to finance such as IRR, XIRR and benchmarks to give information on funds/stocks success.'
            ]
        }
    ],
    'blog_posts': [
        {
            # To add a custom cover image, add an 'image_url' key like below:
            # 'image_url': 'images/my_blog_image.jpg',
            'slug': 'data-pipeline-architecture-patterns',
            'image_url': 'https://picsum.photos/seed/b1/800/600',
            'title': 'Data Pipeline Architecture Patterns',
            'date': 'May 2026',
            'excerpt': 'Exploring scalable ETL architecture patterns, resilient data workflows, and cloud-native pipeline design.',
            'content': [
                'Data engineers need pipelines that are reliable, testable, and easy to operate. This article covers architecture patterns for batch and incremental ETL systems.',
                'I explain how AWS Glue, S3, Lambda, and Step Functions work together to deliver resilient data processing aligned with financial reporting needs.',
                'The post also includes best practices for schema versioning, monitoring, and handling schema drift in production datasets.'
            ]
        },
        {
            'slug': 'power-bi-semantic-models-mastery',
            'title': 'Power BI Semantic Models Mastery',
            'date': 'April 2026',
            'excerpt': 'A guide to semantic modeling, star schemas, and high-performance analytics in Power BI.',
            'content': [
                'A strong semantic model is the foundation of reliable BI. In this article, I describe how to build reusable metrics and organized business logic.',
                'I share practical advice for financial dashboards, model relationships, and optimized DAX measures for fast reporting.',
                'The article also covers deployment and model governance to keep analytics performant and consistent across teams.'
            ]
        },
        {
            'slug': 'aws-data-solutions-at-scale',
            'title': 'AWS Data Solutions at Scale',
            'date': 'March 2026',
            'excerpt': 'How to use Glue, Lambda, Athena, and S3 to build cost-efficient data platforms with both batch and streaming workflows.',
            'content': [
                'This blog post walks through a production-ready AWS data platform architecture for finance and operational analytics.',
                'It explains how to design a lakehouse, catalog metadata, and automate data loading while keeping costs under control.',
                'The write-up also includes troubleshooting advice, logging patterns, and deployment tips for automated scheduling.'
            ]
        }
    ],
    'publications': [
        {
            'title': 'Classification of Chess Pieces Using Distributed Deep Learning',
            'publisher': 'Springer, Recent Trends in Communication and Intelligent Systems',
            'date': 'Dec 2024',
            'doi': 'DOI:10.1007/978-981-97-7632-0_3'
        }
    ]
}

@app.route('/')
def home():
    return render_template('index.html', data=resume_data)

@app.route('/about')
def about():
    return render_template('about.html', data=resume_data)

@app.route('/projects')
def projects():
    return render_template('projects.html', data=resume_data, projects=resume_data['projects'])

@app.route('/projects/<int:project_id>')
def project_detail(project_id):
    # Find matching project
    if project_id < 0 or project_id >= len(resume_data['projects']):
        abort(404)
    
    project = resume_data['projects'][project_id]
    return render_template('project_detail.html', data=resume_data, project=project, project_id=project_id)

@app.route('/blogs')
def blogs():
    return render_template('blogs.html', data=resume_data, posts=resume_data['blog_posts'])

@app.route('/blogs/<slug>')
def blog_post(slug):
    # Find matching blog post
    post = next(
        (p for p in resume_data['blog_posts'] if p['slug'] == slug),
        None
    )

    # If not found
    if post is None:
        abort(404)

    return render_template('blog_post.html', data=resume_data, post=post)

if __name__ == '__main__':
    app.run(debug=True)