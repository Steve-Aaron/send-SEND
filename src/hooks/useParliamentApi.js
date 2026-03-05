import { useState } from 'react';

export function useParliamentApi() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const lookupPostcode = async (postcode) => {
        setLoading(true);
        setError(null);
        try {
            const cleanPostcode = postcode.replace(/\s+/g, '').toUpperCase();

            const res = await fetch(`https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${cleanPostcode}`);

            if (!res.ok) throw new Error('Failed to find constituency for this postcode');
            const data = await res.json();

            if (!data.items || data.items.length === 0) {
                throw new Error('No constituency found for this postcode. Please check it and try again.');
            }

            const constituencyName = data.items[0].value.name;
            const member = data.items[0].value.currentRepresentation?.member?.value;

            if (!member) {
                throw new Error('No sitting MP found for this constituency at this time.');
            }

            // Fetch contact details for email
            const contactRes = await fetch(`https://members-api.parliament.uk/api/Members/${member.id}/Contact`);
            const contactData = await contactRes.json();

            let email = null;
            if (contactData.value) {
                // Prefer Parliamentary office email, fallback to constituency
                const parlOffice = contactData.value.find(c => c.type === 'Parliamentary office' && c.email);
                const constOffice = contactData.value.find(c => c.type === 'Constituency office' && c.email);
                email = parlOffice?.email || constOffice?.email || null;
            }

            return {
                id: member.id,
                name: member.nameDisplayAs,
                party: member.latestParty?.name || 'Independent',
                partyColor: member.latestParty?.backgroundColour ? `#${member.latestParty.backgroundColour}` : '#888888',
                constituency: constituencyName,
                portraitUrl: member.thumbnailUrl,
                email: email
            };

        } catch (err) {
            setError(err.message || 'An error occurred while looking up your MP');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { lookupPostcode, loading, error };
}
