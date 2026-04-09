import Link from "next/link";
import Image from "next/image";
import projectsData from "public/data/Residential.json"

export default function ActiveProjectsSection({
  projects = projectsData,
  title = "Explore Our Active Projects",
}) {
  const activeProjects = projects.filter(
    (project) => project.status === "ongoing",
  );

  if (!activeProjects.length) {
    return null;
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#0d0d0d] md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activeProjects.map((project) => (
            <Link
              href={`/dholera-residential-plots/${project.link}`}
              key={project.link}
              className="group block"
            >
              <article className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.projectName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-[#deae3c] px-3 py-1 text-sm font-semibold text-white">
                      Active
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="mb-3 text-xl font-bold text-[#0d0d0d] transition-colors duration-300 group-hover:text-yellow-600">
                    {project.projectName}
                  </h3>

                  <p className="mb-4 text-sm text-gray-600">{project.location}</p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="font-semibold text-[#deae3c]">
                      Explore Project
                    </span>
                    <span className="text-[#deae3c] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}