"use client";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#F5F5F0] border-t border-black/10">
      <div className="max-w-[1920px] mx-auto px-8 md:px-16 lg:px-24 py-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-start justify-between">
          {/* Icon/Asterisk - Left */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold">*</div>
          </div>

          {/* Contact Info - Name & Title */}
          <div className="flex-1 px-12">
            <div className="text-sm leading-relaxed">
              <div className="font-medium">Preston Chen</div>
              <div className="text-black/70">Data Quality Engineer</div>
              <div className="text-black/70">South San Francisco, CA</div>
            </div>
          </div>

          {/* Email */}
          <div className="flex-1 px-12">
            <div className="text-sm leading-relaxed">
              <div className="text-black/70 mb-1">Email</div>
              <a
                href="mailto:pchen415@gmail.com"
                className="hover:opacity-60 transition-opacity duration-200"
              >
                pchen415@gmail.com
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex-1 px-12">
            <div className="text-sm leading-relaxed">
              <div className="text-black/70 mb-1">LinkedIn</div>
              <a
                href="https://linkedin.com/in/preston-chen-b2459853"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity duration-200"
              >
                @preston-chen
              </a>
            </div>
          </div>

          {/* GitHub */}
          <div className="flex-1 px-12">
            <div className="text-sm leading-relaxed">
              <div className="text-black/70 mb-1">GitHub</div>
              <a
                href="https://github.com/Preston-C89-Chen"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity duration-200"
              >
                @Preston-C89-Chen
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden flex-col gap-6">
          {/* Icon */}
          <div className="text-2xl font-bold">*</div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Name & Title */}
            <div className="text-sm leading-relaxed">
              <div className="font-medium">Preston Chen</div>
              <div className="text-black/70">Data Quality Engineer</div>
              <div className="text-black/70">South San Francisco, CA</div>
            </div>

            {/* Email */}
            <div className="text-sm leading-relaxed">
              <div className="text-black/70 mb-1">Email</div>
              <a
                href="mailto:pchen415@gmail.com"
                className="hover:opacity-60 transition-opacity duration-200"
              >
                pchen415@gmail.com
              </a>
            </div>

            {/* LinkedIn */}
            <div className="text-sm leading-relaxed">
              <div className="text-black/70 mb-1">LinkedIn</div>
              <a
                href="https://linkedin.com/in/preston-chen-b2459853"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity duration-200"
              >
                @preston-chen
              </a>
            </div>

            {/* GitHub */}
            <div className="text-sm leading-relaxed">
              <div className="text-black/70 mb-1">GitHub</div>
              <a
                href="https://github.com/Preston-C89-Chen"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity duration-200"
              >
                @Preston-C89-Chen
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
