<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>Sitemap</title>
                <style>
                    body { font-family: sans-serif; }
                    .url { padding: 10px; margin: 5px 0; border-bottom: 1px solid #ddd; }
                    .loc { font-size: 18px; color: #007acc; }
                    .lastmod { color: #888; }
                    .image { color: #555; }
                </style>
            </head>
            <body>
                <h1>Sitemap</h1>
                <xsl:for-each select="urlset/url">
                    <div class="url">
                        <div class="loc">
                            <strong>URL:</strong>
                            <xsl:value-of select="loc"/>
                        </div>
                        <div class="lastmod">
                            <strong>Last Modified:</strong>
                            <xsl:value-of select="lastmod"/>
                        </div>
                        <xsl:if test="image:image">
                            <div class="image">
                                <strong>Image URL:</strong>
                                <xsl:value-of select="image:image/image:loc"/>
                            </div>
                        </xsl:if>
                    </div>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
