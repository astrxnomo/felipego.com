import { Client } from "@notionhq/client";
import { config } from "dotenv";

config(); // Cargar variables de entorno desde el archivo .env

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const DATABASE_IDS = {
    certificates: process.env.NOTION_CERTIFICATES_DB_ID,
    projects: process.env.NOTION_PROJECTS_DB_ID,
    education: process.env.NOTION_EDUCATION_DB_ID,
    experience: process.env.NOTION_EXPERIENCE_DB_ID,
};

async function queryDatabase(databaseId) {
    const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
            { property: 'id', direction: 'descending' },
        ],
    });
    return response.results;
}

export async function getCertificates() {
    const results = await queryDatabase(DATABASE_IDS.certificates);
    return results.map((page) => {
        const { properties } = page;
        return {
            id: properties.id?.number || '',
            slug: properties.slug?.rich_text?.[0]?.plain_text || '',
            time: properties.time?.rich_text?.[0]?.plain_text || '',
            title: properties.title?.title?.[0]?.plain_text || '',
            certificatorUrl: properties.certificatorUrl?.url || '',
            certificatorName: properties.certificatorName?.rich_text?.[0]?.plain_text || '',
            credentialUrl: properties.credentialUrl?.url || '',
            img: properties.img?.files?.[0]?.file?.url || '',
        };
    });
}

export async function getProjects() {
    const results = await queryDatabase(DATABASE_IDS.projects);
    return results.map((page) => {
        const { properties } = page;
        return {
            id: properties.id?.number || '',
            name: properties.name?.title?.[0]?.plain_text || '',
            description: properties.description?.rich_text?.[0]?.plain_text || '',
            technologies: properties.technologies?.multi_select?.map(tag => tag.name) || [],
            githubLink: properties.githubLink?.url || '',
            liveLink: properties.liveLink?.url || '',
            img: properties.img?.files?.[0]?.file?.url || '',
        };
    });
}

export async function getEducation() {
    const results = await queryDatabase(DATABASE_IDS.education);
    return results.map((page) => {
        const { properties } = page;
        return {
            id: properties.id?.number || '',
            institution: properties.institution?.title?.[0]?.plain_text || '',
            degree: properties.degree?.rich_text?.[0]?.plain_text || '',
            fieldOfStudy: properties.fieldOfStudy?.rich_text?.[0]?.plain_text || '',
            startDate: properties.startDate?.date?.start || '',
            endDate: properties.endDate?.date?.end || '',
            img: properties.img?.files?.[0]?.file?.url || '',
        };
    });
}

export async function getExperience() {
    const results = await queryDatabase(DATABASE_IDS.experience);
    return results.map((page) => {
        const { properties } = page;
        return {
            id: properties.id?.number || '',
            time: properties.time?.rich_text?.[0]?.plain_text || '',
            title: properties.title?.title?.[0]?.plain_text || '',
            companyUrl: properties.companyUrl?.rich_text?.[0]?.plain_text || '',
            companyName: properties.companyName?.rich_text?.[0]?.plain_text || '',
            description: properties.description?.rich_text?.[0]?.plain_text || '',
        };
    });
}