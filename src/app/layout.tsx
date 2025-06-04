export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="py-[60px] xl:px-[100px] sm:px-[60px] px-[30px]">
                <main>{children}</main>
            </body>
        </html>
    );
}